package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/jadiego/bloom/apiserver/handlers"
	"github.com/jadiego/bloom/apiserver/middleware"
	"github.com/jadiego/bloom/apiserver/models/stories"
	"github.com/jadiego/bloom/apiserver/models/users"
	"github.com/jadiego/bloom/apiserver/sessions"
	redis "gopkg.in/redis.v5"
)

// default port numbers
const (
	defaultPort      = "443"
	defaultRedisPort = "6379"
	defaultMongoPort = "27017"
)

// route paths
const (
	apiRoot             = "/v1/"
	apiUsers            = apiRoot + "users"
	apiSessions         = apiRoot + "sessions"
	apiResetCodes       = apiRoot + "resetcodes"
	apiResetPassword    = apiRoot + "passwords/"
	apiSessionsMine     = apiSessions + "/mine"
	apiUsersMe          = apiUsers + "/me"
	apiStories          = apiRoot + "stories"
	apiSpecificStories  = apiStories + "/"
	apiSections         = apiRoot + "sections"
	apiSpecificSections = apiSections + "/"
)

//main is the main entry point for this program
func main() {
	fmt.Println("Starting Bloom App..")
	//read and use the following environment variables
	//when initializing and starting your web server
	// PORT - port number to listen on for HTTP requests (if not set, use defaultPort)
	// HOST - host address to respond to (if not set, leave empty, which means any host)
	// SESSIONKEY - a string to use as the session ID singing key
	// REDISADDR - the address of your redis session store (if not set, use defaultRedisPort)
	// DBADDR - the address of your database server (if not set, use defaultMongoPort)
	port := os.Getenv("PORT")
	if len(port) == 0 {
		fmt.Println("Port number not set. Defaulting to port: " + defaultPort)
		port = defaultPort
	}
	host := os.Getenv("HOST")
	if len(host) == 0 {
		fmt.Println("Host not set. Defaulting to empty host")
		host = ""
	}
	addr := fmt.Sprintf("%s:%s", host, port)

	//Set Redis
	redisAddr := os.Getenv("REDISADDR")
	if len(redisAddr) == 0 {
		fmt.Println("Redis address not set. Defaulting to port: " + defaultRedisPort)
		redisAddr = defaultRedisPort
	}
	rclient := redis.NewClient(&redis.Options{
		Addr: redisAddr,
	})
	rstore := sessions.NewRedisStore(rclient, -1)

	//Set Users DB
	dbAddr := os.Getenv("DBADDR")
	if len(dbAddr) == 0 {
		fmt.Println("DB address not set. Defaulting to port: " + defaultMongoPort)
		dbAddr = defaultMongoPort
	}
	udbstore, err := users.NewMongoStore(dbAddr, "bloom", "users")
	if err != nil {
		log.Fatalf("error starting DB: %v", err.Error())
	}
	defer udbstore.Session.Close()
	// Set Stories DB
	sdbstore, err := stories.NewMongoStore(dbAddr, "bloom", "stories", "sections")
	if err != nil {
		log.Fatalf("error starting DB: %v", err.Error())
	}
	defer sdbstore.Session.Close()

	//Get sessionkey
	sesskey := os.Getenv("SESSIONKEY")
	if len(sesskey) < 1 {
		log.Fatal("sesion key env not set")
	}

	//Initialize context
	ctx := &handlers.Context{
		SessionKey:   sesskey,
		SessionStore: rstore,
		UserStore:    udbstore,
		StoryStore:   sdbstore,
	}

	//get the TLS key and cert paths from environment variables
	//this allows us to use a self-signed cert/key during development
	//and the Let's Encrypt cert/key in production
	tlsKeyPath := os.Getenv("TLSKEY")
	tlsCertPath := os.Getenv("TLSCERT")

	//ensure the mail env used by ctx.PasswordResetHandler
	if len(os.Getenv("MAILHOST")) < 1 {
		log.Fatal("mail host not set")
	}
	if len(os.Getenv("MAILPORT")) < 1 {
		log.Fatal("mail port not set")
	}
	if len(os.Getenv("MAILUSERNAME")) < 1 {
		log.Fatal("mail username not set")
	}
	if len(os.Getenv("MAILPASSWORD")) < 1 {
		log.Fatal("mail password not set")
	}

	mux := http.NewServeMux()
	muxLogged := http.NewServeMux()

	muxLogged.HandleFunc(apiUsers, ctx.UsersHandler)
	muxLogged.HandleFunc(apiSessions, ctx.SessionsHandler)
	muxLogged.HandleFunc(apiSessionsMine, ctx.SessionsMineHandler)
	muxLogged.HandleFunc(apiUsersMe, ctx.UsersMeHanlder)
	muxLogged.HandleFunc(apiStories, ctx.StoriesHandler)
	muxLogged.HandleFunc(apiSpecificStories, ctx.SpecificStoryhandler)
	muxLogged.HandleFunc(apiSections, ctx.SectionsHandler)
	muxLogged.HandleFunc(apiSpecificSections, ctx.SpecificSectionHandler)
	muxLogged.HandleFunc(apiResetCodes, ctx.ResetCodesHandler)
	muxLogged.HandleFunc(apiResetPassword, ctx.PasswordResetHandler)

	logger := log.New(os.Stdout, "", log.LstdFlags)
	mux.Handle(apiRoot, middleware.Adapt(muxLogged, middleware.CORS("", "", "", ""), middleware.Notify(logger)))

	//start your web server and use log.Fatal() to log
	//any errors that occur if the server can't start
	//HINT: https://golang.org/pkg/net/http/#ListenAndServe
	fmt.Printf("server is listening at %s:%s...\n", host, port)
	log.Fatal(http.ListenAndServeTLS(addr, tlsCertPath, tlsKeyPath, mux))

}
