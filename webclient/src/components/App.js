import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'

//components
import Navbar from './Navbar'
import Footer from './Footer'
import { Auth } from './Auth'

//routing components
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

//pages
import Home from './Home'
import About from './About'
import Account from './Account'
import Story from './Story'
import Edit from './Edit'
import Signup from './Signup'
import Login from './Login'

class App extends Component {
    render() {
        return (
            <BrowserRouter forceRefresh={!('pushState' in window.history)} >
                <Container fluid id='app'>
                    <Navbar />
                    <div>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/about" component={About} />
                        <AuthRoute path="/account" component={Account} />
                        <Route exact path="/story" component={Story} />
                        <Route exact path="/edit" component={Edit} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={Signup} />
                    </div>
                    <Footer />
                </Container>
            </BrowserRouter>
        )
    }
}

const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        Auth.isAuthenticated() ? (
            <Component {...props} />
        ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }} />
            )
    )} />
)

export default App