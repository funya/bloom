package stories

import (
	"errors"

	"github.com/jadiego/bloom/apiserver/models/users"
)

//ErrStoryNotFound is returned when the requested story is not found in the store
var ErrStoryNotFound = errors.New("story not found")

//ErrSectionNotFound is returned when the requested story is not found in the store
var ErrSectionNotFound = errors.New("section not found")

//Store represents an abstract store for model.Story/ model.Section objects.
//This interface is used by HTTP handlers to insert,get, delete, and update
//sections/stories.
type Store interface {
	//GetAllStories returns all public stories
	GetAllStories() ([]*Story, error)

	//GetStoryByID returns the Story with the given ID
	GetStoryByID(id StoryID) (*Story, error)

	//GetStoryByCreator returns a list of stories created by the author
	GetStoryByCreator(id users.UserID) ([]*Story, error)

	//InsertStory inserts a new story into the store
	//and returns a Story with a newly assigned ID
	InsertStory(id users.UserID, newStory *NewStory) (*Story, error)

	//GetAllStorySections returns all sections within a story
	GetAllStorySections(id StoryID) ([]*Section, error)

	//GetStoryByID returns the Story with the given ID
	GetSectionByID(id SectionID) (*Section, error)

	//UpdateStory applies StoryUpdates to the current Story
	UpdateStory(updates *StoryUpdates, currentStory *Story) error

	//DeleteStory deletes the story and sections within it
	DeleteStory(id StoryID) error

	//InsertSection inserts a new section into the Store
	//and returns a new Section with a newly assigned ID
	InsertSection(id users.UserID, newSection *NewSection) (*Section, error)

	//UpdateSection applies the SectionUpdates to the current section
	UpdateSection(updates *SectionUpdates, currentSection *Section) error

	//DeleteSection deletes the section
	DeleteSection(id SectionID) error
}
