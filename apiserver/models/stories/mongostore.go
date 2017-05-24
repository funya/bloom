package stories

import (
	"time"

	"github.com/jadiego/bloom/apiserver/models/users"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

//MongoStore represents a stories.Store backed by MongoDB
type MongoStore struct {
	Session                *mgo.Session
	DatabaseName           string
	StoriesCollectionName  string
	SectionsCollectionName string
}

//GetAllStories returns all public stories
func (ms *MongoStore) GetAllStories() ([]*Story, error) {
	stories := []*Story{}
	err := ms.Session.DB(ms.DatabaseName).C(ms.StoriesCollectionName).Find(bson.M{"private": false}).All(&stories)
	if err != nil {
		return nil, err
	}
	return stories, nil
}

//GetStoryByID returns the Story with the given ID
func (ms *MongoStore) GetStoryByID(id StoryID) (*Story, error) {
	story := &Story{}
	err := ms.Session.DB(ms.DatabaseName).C(ms.StoriesCollectionName).FindId(id).One(story)
	if err == mgo.ErrNotFound {
		return nil, ErrStoryNotFound
	}
	return story, nil
}

//GetStoryByCreator gets all the stories created by the author
func (ms *MongoStore) GetStoryByCreator(id users.UserID) ([]*Story, error) {
	stories := []*Story{}
	query := bson.M{"creator_id": id}
	err := ms.Session.DB(ms.DatabaseName).C(ms.StoriesCollectionName).Find(query).All(&stories)
	return stories, err
}

//InsertStory inserts a new story into the store
//and returns a Story with a newly assigned ID
func (ms *MongoStore) InsertStory(id users.UserID, newStory *NewStory) (*Story, error) {
	s := newStory.ToStory()
	s.CreatorID = id
	s.ID = StoryID(bson.NewObjectId().Hex())
	err := ms.Session.DB(ms.DatabaseName).C(ms.StoriesCollectionName).Insert(s)
	return s, err
}

//GetAllStorySections returns all sections within a story
func (ms *MongoStore) GetAllStorySections(id StoryID) ([]*Section, error) {
	sections := []*Section{}
	query := bson.M{"story_id": id}
	err := ms.Session.DB(ms.DatabaseName).C(ms.SectionsCollectionName).Find(query).All(&sections)
	return sections, err
}

//GetSectionByID returns the Story with the given ID
func (ms *MongoStore) GetSectionByID(id SectionID) (*Section, error) {
	section := &Section{}
	err := ms.Session.DB(ms.DatabaseName).C(ms.SectionsCollectionName).FindId(id).One(section)
	if err == mgo.ErrNotFound {
		return nil, ErrSectionNotFound
	}
	return section, nil
}

//UpdateStory applies StoryUpdates to the current Story
func (ms *MongoStore) UpdateStory(updates *StoryUpdates, currentStory *Story) error {
	col := ms.Session.DB(ms.DatabaseName).C(ms.StoriesCollectionName)
	storyupdates := bson.M{"$set": updates}
	err := col.UpdateId(currentStory.ID, storyupdates)
	return err
}

//DeleteStory deletes the story and sections within it
func (ms *MongoStore) DeleteStory(id StoryID) error {
	err := ms.Session.DB(ms.DatabaseName).C(ms.StoriesCollectionName).RemoveId(id)
	if err != nil {
		return err
	}

	_, err = ms.Session.DB(ms.DatabaseName).C(ms.SectionsCollectionName).RemoveAll(bson.M{"story_id": id})
	if err != nil {
		return err
	}
	return nil
}

//InsertSection inserts a new section into the Store
//and returns a new Section with a newly assigned ID
func (ms *MongoStore) InsertSection(id users.UserID, newSection *NewSection) (*Section, error) {
	s := newSection.ToSection()
	s.CreatorID = id
	s.ID = SectionID(bson.NewObjectId().Hex())
	s.Index, _ = ms.Session.DB(ms.DatabaseName).C(ms.SectionsCollectionName).Find(bson.M{"story_id": newSection.StoryID}).Count()
	err := ms.Session.DB(ms.DatabaseName).C(ms.SectionsCollectionName).Insert(s)
	return s, err
}

//UpdateSection applies the SectionUpdates to the current section
func (ms *MongoStore) UpdateSection(updates *SectionUpdates, currentSection *Section) error {
	currentSection.EditedAt = time.Now()
	col := ms.Session.DB(ms.DatabaseName).C(ms.SectionsCollectionName)
	sectionupdates := bson.M{"$set": updates}
	err := col.UpdateId(currentSection.ID, sectionupdates)
	return err
}

//DeleteSection deletes the section
func (ms *MongoStore) DeleteSection(id SectionID) error {
	err := ms.Session.DB(ms.DatabaseName).C(ms.SectionsCollectionName).RemoveId(id)
	return err
}

//NewMongoStore constructs a new MongoStore, using the provided
//addr. If the `mongoAddr` is nil, it will use a default port and host
func NewMongoStore(mongoAddr, DBName, StoriesCollectName, SectionsCollectName string) (*MongoStore, error) {
	if len(mongoAddr) == 0 {
		mongoAddr = "localhost:27017"
	}

	sess, err := mgo.Dial(mongoAddr)
	if err != nil {
		return nil, err
	}
	if len(DBName) == 0 {
		DBName = "bloom"
	}

	if len(StoriesCollectName) == 0 {
		StoriesCollectName = "stories"
	}

	if len(SectionsCollectName) == 0 {
		SectionsCollectName = "sections"
	}

	return &MongoStore{
		Session:                sess,
		DatabaseName:           DBName,
		StoriesCollectionName:  StoriesCollectName,
		SectionsCollectionName: SectionsCollectName,
	}, nil
}
