package stories

import (
	"fmt"
	"time"

	"github.com/jadiego/bloom/apiserver/models/users"
)

//StoryID defines the type of story IDs
type StoryID string

//Story represents a single story in the database
type Story struct {
	ID          StoryID      `json:"id" bson:"_id"`
	CreatorID   users.UserID `json:"creatorid" bson:"creator_id"`
	Name        string       `json:"name"`
	Description string       `json:"description"`
	CreatedAt   time.Time    `json:"createdAt"`
	Private     bool         `json:"private"`
}

//NewStory represents the fields a new story the client wants
//to create
type NewStory struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Private     bool   `json:"private"`
}

//StoryUpdates represents updates one can make to a story
type StoryUpdates struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Private     bool   `json:"private"`
}

//Validate validates the new story
func (ns *NewStory) Validate() error {
	//ensure the name is not empty
	if len(ns.Name) < 1 {
		return fmt.Errorf("Story name not valid. Name can't be empty")
	}

	return nil
}

//ToStory converts the NewStory to a Story
func (ns *NewStory) ToStory() *Story {
	//construct a new Story setting the various fields
	s := &Story{
		Name:        ns.Name,
		Description: ns.Description,
		CreatedAt:   time.Now(),
		Private:     ns.Private,
	}

	return s
}
