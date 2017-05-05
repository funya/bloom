package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/jadiego/bloom/apiserver/models/stories"
	"github.com/jadiego/bloom/apiserver/sessions"
)

//StoriesHandler allows new stories to be submitted or returns all stories
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
		sessions.GetState(r, ctx.SessionKey, ctx.SessionStore, ss)

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
