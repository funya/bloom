package handlers

import (
	"encoding/json"
	"net/http"

	"path"

	"github.com/jadiego/bloom/apiserver/models/stories"
	"github.com/jadiego/bloom/apiserver/sessions"
)

//StoriesHandler allows new stories to be submitted or returns all stories
// /v1/stories
func (ctx *Context) StoriesHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "POST":
		//Decode the request body into a models.NewUser struct
		d := json.NewDecoder(r.Body)
		ns := &stories.NewStory{}
		if err := d.Decode(ns); err != nil {
			http.Error(w, "invalid JSON", http.StatusBadRequest)
			return
		}

		//Validate the models.NewStory
		if err := ns.Validate(); err != nil {
			http.Error(w, "error validating story: "+err.Error(), http.StatusBadRequest)
			return
		}

		//get the session state
		ss := &SessionState{}
		_, err := sessions.GetState(r, ctx.SessionKey, ctx.SessionStore, ss)
		if err != nil {
			http.Error(w, "error getting session: "+err.Error(), http.StatusUnauthorized)
			return
		}

		s, err := ctx.StoryStore.InsertStory(ss.User.ID, ns)
		if err != nil {
			http.Error(w, "error inserting story into DB: "+err.Error(), http.StatusBadRequest)
			return
		}

		//Respond to the client with the models.Story struct encoded as a JSON object
		w.Header().Add(headerContentType, contentTypeJSONUTF8)
		encoder := json.NewEncoder(w)
		encoder.Encode(s)

	case "GET":
		//Get all stories from the StoryStore and write them
		//to the response as a JSON-encoded array
		stories, err := ctx.StoryStore.GetAllStories()
		if err != nil {
			http.Error(w, "error getting all stories: "+err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Add(headerContentType, contentTypeJSONUTF8)
		encoder := json.NewEncoder(w)
		encoder.Encode(stories)
	}
}

//SpecificStoryhandler allows fro getting the sections of a story, updating a story's title or description
//or delete the story. It all depends on the request method
// /v1/stories/<story-id>
func (ctx *Context) SpecificStoryhandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		//If the user is allowed to read the sections form this channel (User is creator or the story is public)
		//then returns all the sections from the specified story and writes those to the response

		//Get the story ID from the request's URL path
		_, id := path.Split(r.URL.String())

		s, err := ctx.StoryStore.GetStoryByID(stories.StoryID(id))
		if err != nil {
			http.Error(w, "error getting story: "+err.Error(), http.StatusBadRequest)
			return
		}

		//check if story is private
		if s.Private {
			http.Error(w, "error getting story: "+err.Error(), http.StatusUnauthorized)
			return
		}

		//get the session state and checks for two things, if the story is private or if the creator user is authenticated

		ss := &SessionState{}
		_, err = sessions.GetState(r, ctx.SessionKey, ctx.SessionStore, ss)
		if !s.Private && err != nil {
			http.Error(w, "error you are not allowed to access this story: "+err.Error(), http.StatusUnauthorized)
			return
		}

		sections, err := ctx.StoryStore.GetAllStorySections(stories.StoryID(id))
		if err != nil {
			http.Error(w, "error getting story sections: "+err.Error(), http.StatusBadRequest)
			return
		}

		w.Header().Add(headerContentType, contentTypeJSONUTF8)
		encoder := json.NewEncoder(w)
		encoder.Encode(sections)
	}
}

//SectionsHandler allows new sections to be submitted
// /v1/sections
func (ctx *Context) SectionsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		//Insert the new section, and respond by writing the newly inserted section to the response

		//Decode the request body into a models.NewSection struct
		d := json.NewDecoder(r.Body)
		ns := &stories.NewSection{}
		if err := d.Decode(ns); err != nil {
			http.Error(w, "invalid JSON", http.StatusBadRequest)
			return
		}

		//Validate the models.NewSection
		if err := ns.Validate(); err != nil {
			http.Error(w, "error invalid section: "+err.Error(), http.StatusBadRequest)
			return
		}

		//get the session state
		ss := &SessionState{}
		_, err := sessions.GetState(r, ctx.SessionKey, ctx.SessionStore, ss)
		if err != nil {
			http.Error(w, "error getting session: "+err.Error(), http.StatusUnauthorized)
			return
		}

		s, err := ctx.StoryStore.InsertSection(ss.User.ID, ns)
		if err != nil {
			http.Error(w, "error inserting story into DB: "+err.Error(), http.StatusInternalServerError)
			return
		}

		//Respond to the client with the models.Story struct encoded as a JSON object
		w.Header().Add(headerContentType, contentTypeJSONUTF8)
		encoder := json.NewEncoder(w)
		encoder.Encode(s)
	}
}
