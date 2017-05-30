package sessions

import (
	"errors"
	"time"
)

//DefaultSessionDuration is the default duration for
//saving session data in the store. Most Store implementations
//will automatically delete saved session data after this time.
const DefaultSessionDuration = time.Hour

//ErrStateNotFound is returned from Store.Get() when the requested
//session id was not found in the store
var ErrStateNotFound = errors.New("your session has expired")

//Store represents a session data store.
//This is an abstract interface that can be implemented
//against several different types of data stores. For example,
//session data could be stored in memory in a concurrent map,
//or more typically in a shared key/value server store like redis.
type Store interface {
	//Save associates the provided `state`` data with the provided `sid` in the store.
	Save(sid SessionID, state interface{}) error

	//Get retrieves the previously saved state data for the session id,
	//and populates the `state` parameter with it. This will also
	//reset the data's time to live in the store.
	Get(sid SessionID, state interface{}) error

	//LogFailedAttempt logs the following failed sing in attempt to the store
	LogFailedAttempt(userName string) error

	//CheckLoginAttempt checks the following count of sing attemts for given username
	CheckLoginAttempt(userName string) (bool, error)

	//StoreRandomToken stores the randomtoken for password resets for email address
	StoreRandomToken(email string) error

	//GetRandomToken checks the following random for the given email address
	GetRandomToken(email string) (string, error)

	//Delete deletes all state data associated with the session id from the store.
	Delete(sid SessionID) error
}
