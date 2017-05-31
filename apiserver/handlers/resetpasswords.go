package handlers

import (
	"crypto/rand"
	"encoding/json"
	"fmt"
	"net/http"
	"path"

	"os"

	"strconv"

	"github.com/jadiego/bloom/apiserver/models/users"
	"gopkg.in/gomail.v2"
)

//PasswordResetHandler accepts PUT request containing the one time user code,
//the new password, and the confirmnation password. if the reset code is valid,
//and if the passwords matches, we use the email address from the URL query
//to find the user account in the database and reset the password, we then respond
//with a simple confirmation message. Also delete the code from the store so that
//it can't be used again.
func (ctx *Context) PasswordResetHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "PUT" {
		_, email := path.Split(r.URL.String())

		d := json.NewDecoder(r.Body)
		c := &users.PasswordReset{}
		if err := d.Decode(c); err != nil {
			http.Error(w, "invalid JSON", http.StatusBadRequest)
			return
		}

		if err := c.ValidatePasswordReset(); err != nil {
			http.Error(w, "error: "+err.Error(), http.StatusBadRequest)
			return
		}

		token, err := ctx.SessionStore.GetRandomToken(c.Code, email)
		if err != nil {
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		}

		if token != c.Code {
			http.Error(w, "Incorrect token", http.StatusBadRequest)
			return
		}

		if err = ctx.SessionStore.DeleteToken(email); err != nil {
			http.Error(w, "error clearing token", http.StatusInternalServerError)
			return
		}

		u, err := ctx.UserStore.GetByEmail(email)
		if err != nil {
			http.Error(w, "error getting user: "+err.Error(), http.StatusUnauthorized)
			return
		}

		if _, err := ctx.UserStore.ResetPassword(u, c.Password); err != nil {
			http.Error(w, "error resetting password: "+err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Add(headerContentType, contentTypeText)
		w.Write([]byte("Password has been updated."))
	}
}

//ResetCodesHandler allows a POST request containing the users email address. If
//this matches an existing user account, send an email to that address that contains
//a one time use code that expires after 5 minutes. Once a code is used, it should not
//be usable again, and it should not be usable again after it expires.
func (ctx *Context) ResetCodesHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		d := json.NewDecoder(r.Body)
		e := &users.ResetCodeEmail{}
		if err := d.Decode(e); err != nil {
			http.Error(w, "invalid JSON", http.StatusBadRequest)
			return
		}

		_, err := ctx.UserStore.GetByEmail(e.Email)
		if err != nil {
			http.Error(w, "Email not found.", http.StatusBadRequest)
			return
		}

		//create random token
		b := make([]byte, 4)
		rand.Read(b)
		token := fmt.Sprintf("%x", b)

		err = ctx.SessionStore.StoreRandomToken(e.Email, token)
		if err != nil {
			http.Error(w, "error creating random token: "+err.Error(), http.StatusInternalServerError)
			return
		}

		//send reset mail to user
		if err := sendMailWithResetCode(e.Email, token); err != nil {
			http.Error(w, "error sending email: "+err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Add(headerContentType, contentTypeText)
		w.Write([]byte("A reset code has been sent to the email address. Please check your email, and enter in the temporary code."))
	}
}

//sendMailWithResetCode sends the given email the temporary token
func sendMailWithResetCode(email, token string) error {
	body := `Hello,

You recently requested to reset your password for your Chayabloom account. Use the temporary code below to reset it. This password reset is only valid for the next 5 minutes.

Your temporary code: ` + token + `

Thanks,
Chayabloom`

	m := gomail.NewMessage()
	m.SetHeader("From", "noreply@chayabloom.me")
	m.SetHeader("To", email)
	m.SetHeader("Subject", "Chayabloom password reset request")
	m.SetBody("text/plain", body)

	host := os.Getenv("MAILHOST")
	port, _ := strconv.Atoi(os.Getenv("MAILPORT"))
	emailaddr := os.Getenv("MAILUSERNAME")
	pw := os.Getenv("MAILPASSWORD")

	d := gomail.NewDialer(host, port, emailaddr, pw)
	if err := d.DialAndSend(m); err != nil {
		return err
	}

	return nil
}
