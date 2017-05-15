import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'

//components
import Navbar from './Navbar'
import Footer from './Footer'
import { isAuthenticated, apiRoot, storageKey} from '../authentication/Auth'

//routing components
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

//pages
import Home from '../home/Home'
import About from '../about/About'
import Account from '../account/AccountContainer'
import Story from './Story'
import Edit from '../edit/EditContainer'
import Signup from '../authentication/Signup'
import Login from '../authentication/Login'
import Preview from '../preview/PreviewContainer'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            isAuthenticated: false
        }
    }

    componentDidMount() {
        fetch(`${apiRoot}/users/me`, {
            mode: "cors",
            headers: new Headers({
                "Authorization": localStorage.getItem(storageKey)
            })
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    return Promise.reject({
                        status: resp.status,
                        statusText: resp.statusText,
                        statusMessage: resp.text()
                    })
                }
            })
            .then(data => {
                this.setState({user: data, isAuthenticated: true})
                localStorage.setItem("u", JSON.stringify(data))
                return data
            })
            .catch(err => {
                console.log(err)
                localStorage.removeItem("u")
                localStorage.removeItem("auth")
                this.forceUpdate()
                return null
            })
    }


    render() {
        console.log("Rendering App comp. State: ", this.state)
        const AuthRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={props => (
                localStorage.getItem("u") && localStorage.getItem("auth") ? (
                    <Component {...props} />
                ) : (
                        <Redirect to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }} />
                    )
            )} />
        )

        return (
            <BrowserRouter forceRefresh={!('pushState' in window.history)}>
                <Container fluid id='app'>
                    <Navbar {...this.state}/>
                    <div>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/about" component={About} />
                        <AuthRoute exact path="/account" component={Account} />
                        <Route exact path="/story" component={Story} />
                        <AuthRoute exact path="/story/:id/preview" component={Preview}/>
                        <AuthRoute exact path="/story/:id/edit" component={Edit} />
                        <Route exact path="/edit" component={Edit} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/story/:id" component={Story} />
                    </div>
                    <Footer />
                </Container>
            </BrowserRouter>
        )
    }
}

export default App