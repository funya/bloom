package stories

import (
	"fmt"
	"time"

	"github.com/jadiego/bloom/apiserver/models/users"
)

//SectionID defines the type of section IDs
type SectionID string

//Section represents a single section within a story
type Section struct {
	ID        SectionID    `json:"id" bson:"_id"`
	StoryID   StoryID      `json:"storyid" bson:"story_id"`
	CreatorID users.UserID `json:"creatorid" bson:"user_id"`
	Body      string       `json:"body"`
	CreatedAt time.Time    `json:"createdAt"`
	EditedAt  time.Time    `json:"editedAt"`
}

//NewSection represents the fields a new section the client wants
//to add to a story
type NewSection struct {
	StoryID StoryID `json:"storyid" bson:"story_id"`
	Body    string  `json:"body"`
}

//SectionUpdates represents updates one can make to a section
type SectionUpdates struct {
	Body string `json:"body"`
}

//Validate validates the new section
func (ns *NewSection) Validate() error {
	//ensure the name is not empty
	if len(ns.StoryID) < 1 {
		return fmt.Errorf("storyID cant be empty, no context on which story to add this section to")
	}

	if len(ns.Body) < 1 {
		return fmt.Errorf("error invalid body, body can't be empty")
	}

	return nil
}

//ToSection converts the NewSection to a Section
func (ns *NewSection) ToSection() *Section {
	//construct a new Section setting the various fields
	s := &Section{
		Body:      ns.Body,
		StoryID:   ns.StoryID,
		CreatedAt: time.Now(),
		EditedAt:  time.Now(),
	}

	return s
}
