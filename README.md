<p align="center">
  <img src="https://github.com/jadiego/bloom/blob/master/webclient/src/img/lotussmall.png" alt="bloom logo"/>
</p>

# Bloom

Bloom is a project in collaboration with API Chaya, a local nonprofit that serves survivors of sexual assault, domestic violence, and human trafficking. Bloom is a storytelling platform that allows anyone to convey their unique personal stories centered around the theme of sexual assault, domestic violence, and human trafficking, via different forms of media including text and images. Our project is designed to provide a simple platform for users who want to write their personal stories at their own pace and share their experiences with the public at any time.

# Features
- View other user's personal stories at the front page
- Shareable URL of stories that are public
- Create a private account to manage all personal stories created
- Create any amount of public or private stories
- Rearrange sections of your story
- Flexible edit UI that can be changed from "Grid Mode" to "List Mode"
- Input text or images for stories

# Build With
- DigitalOcean: Cloud hosting which provides Linux virtual servers
- MongoDB: NoSQL database program
- Redis: In-memory data structure store for caching
- React: Javascript library for building user interfaces
- Redux: State container management system
- Docker: Software container platform for deploying apps
- Go: Programming language used for API server

> We chose this technology stack for 3 main reasons: low cost, prior knowledge, and ease of use. We already had prior 
> exprience working with these technologies or learned them in previous classes and so it made sense to use them again to 
> make development relatively easier, considering the time frame we had. All the technologies we used besides DigitalOcean
> are open source and has a big community supporting it, whichs makes the source code more accessible. DigitalOcean, though 
> not free, is pretty easy to use with their expansive documentation and they offer a broad range of options of server
> hosting plans, with their lowest tier plan being 5 dollars a month. We chose to use a NoSQL database because our database
> schema changed quite often during development. A NoSQL made sense - it gave us the flexibility we needed.

# Getting Started
The client-side template was built with [Create React App](https://github.com/facebookincubator/create-react-app), which
provides a simple way to start React projects with no build configuration needed.

Projects built with Create-React-App include support for ES6 syntax, as well as several unofficial / not-yet-final forms of Javascript syntax such as Class Properties and JSX.  See the list of [language features and polyfills supported by Create-React-App](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#supported-language-features-and-polyfills) for more information.

To run the API Server locally, you will need to have [Go](https://golang.org/dl/) installed in your machine, along with [Docker](https://docs.docker.com/engine/installation/). The API server will look for a running Redis and MongoDB docker container so you will need to install the following as well.
##### `docker run --name devredis -d -p 6379:6379 redis`
##### `docker run --name devmongo -d -p 27017:27017 mongo`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your client-side app is ready to be deployed!


## Contact
- John Diego - jadiego@uw.edu
- Marika Rundle - mecrundle@comcast.net
- Huy Nguyen - hiiamhuy@uw.edu
- Christy Pham - phamchristy95@gmail.com
- API Chaya - info@apichaya.org
- APIChayaBloom Help - apichayabloom@gmail.com
- Website - https://chayabloom.me/
