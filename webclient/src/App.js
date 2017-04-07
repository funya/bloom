import React from 'react';

import TopNavbar from './components/Navbar'
import Footer from './components/Footer'
import { Container } from 'semantic-ui-react'

//routing components
import { BrowserRouter, Route } from 'react-router-dom';

//views
import Home from './views/Home.js';
import About from './views/About.js';
import Account from './views/Account.js';
import Story from './views/Story.js';
import Edit from './views/Edit.js';


//<Route path="/r/:name" component={SubredditPageContainer} />
const App = (props) => (
    <BrowserRouter>
        <Container fluid id="app">
            <TopNavbar />
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/Story" component={Story} />
            <Route exact path="/Edit" component={Edit} />
            <Footer />
        </Container>
    </BrowserRouter>
);

export default App