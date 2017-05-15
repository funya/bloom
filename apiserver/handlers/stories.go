package handlers

import (
	"encoding/json"
	"net/http"

	"path"

	"strings"

	"github.com/jadiego/bloom/apiserver/models/stories"
	"github.com/jadiego/bloom/apiserver/models/users"
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
		url := r.URL.Query().Get("author")
		if len(url) != 0 {
			//get the session state
			ss := &SessionState{}
			_, err := sessions.GetState(r, ctx.SessionKey, ctx.SessionStore, ss)
			if err != nil {
				http.Error(w, "error getting session: "+err.Error(), http.StatusUnauthorized)
				return
			}

			stories, err := ctx.StoryStore.GetStoryByCreator(users.UserID(url))

			if users.UserID(url) != ss.User.ID {
				http.Error(w, "You are not the author to all these stories", http.StatusUnauthorized)
				return
			}

			if err != nil {
				http.Error(w, "error getting author stories: "+err.Error(), http.StatusInternalServerError)
				return
			}

			w.Header().Add(headerContentType, contentTypeJSONUTF8)
			encoder := json.NewEncoder(w)
			encoder.Encode(stories)
		} else {
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
}

//SpecificStoryhandler allows for getting the sections of a story, updating a story's title or description
//or delete the story. It all depends on the request method
// /v1/stories/<story-id>
func (ctx *Context) SpecificStoryhandler(w http.ResponseWriter, r *http.Request) {
	//Get the story ID from the request's URL path
	_, id := path.Split(r.URL.String())

	s, err := ctx.StoryStore.GetStoryByID(stories.StoryID(id))
	if err != nil {
		http.Error(w, "error getting story: "+err.Error(), http.StatusNotFound)
		return
	}

	switch r.Method {
	case "DELETE":
		//if the current user is the section creator, delete the message and
		//write a simple confirmation message

		//get the session state
		ss := &SessionState{}
		_, err = sessions.GetState(r, ctx.SessionKey, ctx.SessionStore, ss)

		if err != nil || ss.User.ID != s.CreatorID {
			http.Error(w, "error you are not allowed to access this story: "+err.Error(), http.StatusUnauthorized)
			return
		}

		if err := ctx.StoryStore.DeleteStory(stories.StoryID(id)); err != nil {
			http.Error(w, "error deleting story in DB: "+err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Add(headerContentType, contentTypeTextUTF8)
		w.Header().Add(headerContentType, contentTypeText)
		w.Write([]byte("The story has been deleted."))
	case "GET":
		//If the user is allowed to read the sections form this channel (User is creator or the story is public)
		//then returns all the sections from the specified story and writes those to the response

		//get the session state
		ss := &SessionState{}
		_, err = sessions.GetState(r, ctx.SessionKey, ctx.SessionStore, ss)
		if err != nil && s.Private {
			http.Error(w, "error getting current session : "+err.Error(), http.StatusInternalServerError)
			return
		}

		if s.Private && ss.User.ID != s.CreatorID {
			http.Error(w, "error you are not allowed to access this story: "+err.Error(), http.StatusUnauthorized)
			return
		}

		sections, err := ctx.StoryStore.GetAllStorySections(stories.StoryID(id))
		if err != nil {
			http.Error(w, "error getting story sections: "+err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Add(headerContentType, contentTypeJSONUTF8)
		encoder := json.NewEncoder(w)
		encoder.Encode(sections)

	case "PATCH":
		//if the current user is the creator of story, update the specified story's name and description and write the
		//updated story object to the response
		ss := &SessionState{}
		_, err = sessions.GetState(r, ctx.SessionKey, ctx.SessionStore, ss)
		if err != nil {
			http.Error(w, "error getting current session : "+err.Error(), http.StatusInternalServerError)
			return
		}

		if err != nil && ss.User.ID != s.CreatorID {
			http.Error(w, "error you are not allowed to access this story: "+err.Error(), http.StatusUnauthorized)
			return
		}

		//if  the user is not owner of this section
		if strings.Compare(ss.User.ID.String(), s.CreatorID.String()) != 0 {
			http.Error(w, "error you are not allowed to access this story", http.StatusUnauthorized)
			return
		}

		//Decode the request body into a models.NewStory struct
		d := json.NewDecoder(r.Body)
		storyupdates := &stories.StoryUpdates{}
		if err := d.Decode(storyupdates); err != nil {
			http.Error(w, "invalid JSON: "+err.Error(), http.StatusBadRequest)
			return
		}

		err := ctx.StoryStore.UpdateStory(storyupdates, s)
		if err != nil {
			http.Error(w, "error updating story: "+err.Error(), http.StatusInternalServerError)
			return
		}

		updatedstory, _ := ctx.StoryStore.GetStoryByID(stories.StoryID(id))

		w.Header().Add(headerContentType, contentTypeJSONUTF8)
		encoder := json.NewEncoder(w)
		encoder.Encode(updatedstory)
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

//SpecificSectionHandler handles specific sections, such as update and deletion
//of sepcific sections
// /v1/sections/<section-id>
func (ctx *Context) SpecificSectionHandler(w http.ResponseWriter, r *http.Request) {
	//Get the section ID from the request's URL path
	_, id := path.Split(r.URL.String())

	//get section by id from the database
	s, err := ctx.StoryStore.GetSectionByID(stories.SectionID(id))
	if err != nil {
		http.Error(w, "error getting story: "+err.Error(), http.StatusNotFound)
		return
	}

	//get the session state
	//if the user is not authenticated
	ss := &SessionState{}
	_, err = sessions.GetState(r, ctx.SessionKey, ctx.SessionStore, ss)
	if err != nil {
		http.Error(w, "error getting session: "+err.Error(), http.StatusUnauthorized)
		return
	}

	//if  the user is not owner of this section
	if strings.Compare(ss.User.ID.String(), s.CreatorID.String()) != 0 {
		http.Error(w, "error you are not allowed to access this section", http.StatusUnauthorized)
		return
	}

	switch r.Method {
	case "DELETE":
		//if the current user is the section creator, delete the message and
		//write a simple confirmation message

		if err := ctx.StoryStore.DeleteSection(stories.SectionID(id)); err != nil {
			http.Error(w, "error deleting section in DB: "+err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Add(headerContentType, contentTypeTextUTF8)
		w.Header().Add(headerContentType, contentTypeText)
		w.Write([]byte("The section has been deleted."))

	case "PATCH":
		//If the current user is the section creator, update the specified section
		//and write the updated Section object to the response.

		//Decode the request body into a models.SectionUpdates struct
		d := json.NewDecoder(r.Body)
		sectionupdates := &stories.SectionUpdates{}
		if err := d.Decode(sectionupdates); err != nil {
			http.Error(w, "invalid JSON: "+err.Error(), http.StatusBadRequest)
			return
		}

		err = ctx.StoryStore.UpdateSection(sectionupdates, s)
		if err != nil {
			http.Error(w, "error updating section: "+err.Error(), http.StatusInternalServerError)
			return
		}

		updatedsection, _ := ctx.StoryStore.GetSectionByID(stories.SectionID(id))

		w.Header().Add(headerContentType, contentTypeJSONUTF8)
		encoder := json.NewEncoder(w)
		encoder.Encode(updatedsection)
	}
}

// This will handle all requests made to the /v1/messages/<message-id> path. Get the specific message ID from the last part of the request's URL path (you can use path.Split() (Links to an external site.)Links to an external site. for this). What you do with that message ID will depend on the request method.

// PATCH: if the current user is the message creator, update the specified message and write the updated Message object to the response.
// DELETE: if the current user is the message creator, delete the message and write a simple confirmation message
// If you get errors, respond with an appropriate error status code and the error message.
