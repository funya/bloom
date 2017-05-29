import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { isEmpty } from 'lodash';

//components
import Navbar from './Navbar';
import Footer from './Footer';

//routing components
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

//pages
import Home from '../home/Home';
import AboutView from '../about/AboutView';
import Account from '../account/AccountContainer';
import Story from './Story';
import Edit from '../edit/EditContainer';
import Signup from '../authentication/Signup';
import Login from '../authentication/Login';
import Preview from '../preview/PreviewContainer';
import Confirmation from '../preview/Confirmation';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { checkSession } from '../redux/actions';

class App extends Component {
    componentDidMount() {
        this.props.checkSession()
    }

    render() {
        const AuthRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={props => (
                !isEmpty(this.props.currentUser) && localStorage.getItem("auth") ? (
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
                    <Navbar />
                    <Container fluid>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/about" component={AboutView} />
                        <Route exact path="/tos" component={AboutView} />
                        <Route exact path="/privacy" component={AboutView} />
                        <AuthRoute exact path="/account" component={Account} />
                        <Route exact path="/story" component={Story} />
                        <AuthRoute exact path="/story/:id/preview" component={Preview} />
                        <AuthRoute exact path="/story/:id/edit" component={Edit} />
                        <AuthRoute path="/story/:id/confirmation" component={Confirmation} />
                        <Route exact path="/edit" component={Edit} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/story/:id" component={Story} />
                    </Container>
                    <Footer />
                </Container>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        checkSession,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)