import React from 'react';
import { Container } from 'semantic-ui-react'

//components
import Navbar from './Navbar'
import Footer from './Footer'

//routing components
import { BrowserRouter, Route } from 'react-router-dom';

//pages
import Home from './Home';
import About from './About';
import Account from './Account';
import Story from './Story';
import Edit from './Edit';
import Signup from './Signup';
import Login from './Login';



const App = () => (
    <BrowserRouter>
        <Container fluid>
            <Navbar />
            <Container fluid id='app'>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/account" component={Account} />
                <Route exact path="/story" component={Story} />
                <Route exact path="/edit" component={Edit} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
            </Container>
            <Footer />
        </Container>
    </BrowserRouter>
);

export default App