package stories

import (
	"os"
	"testing"

	"github.com/jadiego/bloom/apiserver/models/users"
)

//NOTE: tests in this file will use the MONGOADDR
//environment variable for the mongodb server address.
//If not defined, it will default to a local instance of mongoDB.
//To start a local mongo server using Docker, run
//this command:
// docker run -d -p 27017:27017 mongo

func TestMongoStore(t *testing.T) {
	mongoAddr := os.Getenv("DBADDR")
	if len(mongoAddr) == 0 {
		mongoAddr = "localhost:27017"
	}
	storiesdb, err := NewMongoStore(mongoAddr, "", "", "")
	if err != nil {
		t.Fatalf("error starting storiesDB: %v", err.Error())
	}
	usersdb, err := users.NewMongoStore(mongoAddr, "", "")
	if err != nil {
		t.Fatalf("error starting usersDB: %v", err.Error())
	}
	defer storiesdb.Session.Close()
	defer usersdb.Session.Close()

	u, err := usersdb.GetByUserName("bloom")
	if err != nil {
		t.Fatalf("error getting user from usersDB: %v", err.Error())
	}

	newstory := &NewStory{
		Name:        "Testing Name 1",
		Description: "I want some bahnmi",
	}

	story, err := storiesdb.InsertStory(u.ID, newstory)
	if err != nil {
		t.Fatalf("error inserting story into storiesDB: %v", err.Error())
	}

	story2, err := storiesdb.GetStoryByID(story.ID)
	if err != nil {
		t.Fatalf("error getting story by ID in storiesDB: %v", err.Error())
	}
	if story.ID != story2.ID {
		t.Errorf("ID didn't match after GetStoryByID(), expected %s but got %s", story.ID, story2.ID)
	}
}
