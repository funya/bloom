package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/jadiego/bloom/apiserver/models/users"
)

//ResetCodesHandler allows a POST request containing the users email address. If
//this matches an existing user account, send an email to that address that contains
//a one time use code that expires after 5 minutes. Once a code is used, it should not
//be usable again, and it should not be usable again after it expires.
func (ctx *Context) ResetCodesHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		d := json.NewDecoder(r.Body)
		e := &users.EmailReset{}
		if err := d.Decode(e); err != nil {
			http.Error(w, "invalid JSON", http.StatusBadRequest)
			return
		}

		_, err := ctx.UserStore.GetByEmail(e.Email)
		if err != nil {
			http.Error(w, "Email not found.", http.StatusBadRequest)
			return
		}

		err = ctx.SessionStore.StoreRandomToken(e.Email)
		if err != nil {
			http.Error(w, "error creating random token:"+err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Add(headerContentType, contentTypeText)
		w.Write([]byte("A reset code has been sent to the email address. Please check your email, and enter in the temporary code."))
	}
}
