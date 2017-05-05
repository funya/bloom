package users

import (
	"fmt"
	"net/mail"

	"golang.org/x/crypto/bcrypt"
)

//UserID defines the type for user IDs
type UserID string

//User represents a user account in the database
type User struct {
	ID       UserID `json:"id" bson:"_id"`
	Email    string `json:"email"`
	PassHash []byte `json:"-" bson:"passHash"` //stored in mongo, but never encoded to clients
	UserName string `json:"userName"`
}

//Credentials represents user sign-in credentials
type Credentials struct {
	UserName string `json:"userName"`
	Password string `json:"password"`
}

//NewUser represents a new user signing up for an account
type NewUser struct {
	Email        string `json:"email"`
	Password     string `json:"password"`
	PasswordConf string `json:"passwordConf"`
	UserName     string `json:"userName"`
}

//Validate validates the new user
func (nu *NewUser) Validate() error {
	//ensure Email field is a valid Email
	//HINT: use mail.ParseAddress()
	//https://golang.org/pkg/net/mail/#ParseAddress
	_, err := mail.ParseAddress(nu.Email)
	if err != nil {
		return fmt.Errorf("email must be a valid email")
	}

	//ensure Password is at least 8 chars
	//ensure Password is at least 6 chars
	if len(nu.Password) < 8 {
		return fmt.Errorf("password length not strong enough")
	}

	//ensure Password and PasswordConf match
	//ensure Password and PasswordConf match
	if nu.Password != nu.PasswordConf {
		return fmt.Errorf("password do not match")
	}

	//ensure UserName has non-zero length
	//ensure UserName has non-zero length
	if len(nu.UserName) < 1 || len(nu.UserName) > 8 {
		return fmt.Errorf("username not valid")
	}

	//if you made here, it's valid, so return nil
	return nil
}

//ToUser converts the NewUser to a User
func (nu *NewUser) ToUser() (*User, error) {
	//construct a new User setting the various fields
	//but don't assign a new ID here--do that in your
	//concrete Store.Insert() method
	u := &User{
		Email:    nu.Email,
		UserName: nu.UserName,
	}

	//call the User's SetPassword() method to set the password,
	//which will hash the plaintext password
	if err := u.SetPassword(nu.Password); err != nil {
		return nil, err
	}

	//return the User and nil
	return u, nil
}

//SetPassword hashes the password and stores it in the PassHash field
func (u *User) SetPassword(password string) error {
	//hash the plaintext password using an adaptive
	//crytographic hashing algorithm like bcrypt
	//https://godoc.org/golang.org/x/crypto/bcrypt
	ph, err := bcrypt.GenerateFromPassword([]byte(password), 15)
	if err != nil {
		return err
	}

	//set the User's PassHash field to the resulting hash
	u.PassHash = ph

	return nil
}

//Authenticate compares the plaintext password against the stored hash
//and returns an error if they don't match, or nil if they do
func (u *User) Authenticate(password string) error {
	//compare the plaintext password with the PassHash field
	//using the same hashing algorithm you used in SetPassword
	err := bcrypt.CompareHashAndPassword(u.PassHash, []byte(password))
	if err != nil {
		return err
	}

	return nil
}

//String returns a string representation of the sessionID
func (id UserID) String() string {
	//just return the `sid` as a string
	//HINT: https://tour.golang.org/basics/13
	return string(id)
}
