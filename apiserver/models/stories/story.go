package stories

import (
	"fmt"
	"net/mail"

	"time"
)

type StoryID string

type Story struct {
	ID 			StoryID `json:"id" bson:"_id"`
	Title 		string `json:"title"`
	CreatedAt 	time.Time `json:"createdAt"`
	CreatorID 	user.UserID `json:"creatorid"` //stored in mongo, but never encoded to clients
	Private 	boolean `json:"private"`
}

type NewStory struct {
		Title 		string `json:"title"`
		
}
