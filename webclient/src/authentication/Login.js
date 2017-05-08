import React, { Component } from 'react';
import { Form, Header, Container, Button, Image, Message, Segment } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom';

import './Login_Signup.css'

import image from '../img/lotus.svg'
import { Auth, storageKey } from './Auth'

class Login extends Component {
    state = {
        username: "",
        password: "",
        redirectToReferrer: false,
        loading: false,
        error: false,
        errmsg: ""
    }


    handlePasswordChange = (event) => this.setState({ password: event.target.value })
    handleUsernameChange = (event) => this.setState({ username: event.target.value })

    handleSignInSubmit = (event) => {
        event.preventDefault();

        Auth.authenticate(this, this.state.username, this.state.password)
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.state

        if (redirectToReferrer) {
            return (
                <Redirect to={from} />
            )
        }

        let warningmessage = null
        if (from.pathname === "/account") {
            warningmessage = <Segment basic padded><Message error content='You need to sign in to access this page.' /></Segment>
        }

        return (
            <Container>
                {warningmessage}
                <Header id="title" textAlign='center' as='h1'>
                    <Image src={image} alt='logo' />
                    Bloom
                </Header>
                <Form id='signup' onSubmit={event => this.handleSignInSubmit(event)} loading={this.state.loading} warning={this.state.error}>
                    <Header textAlign='center' as='h2'> Sign In</Header>
                    <Form.Field>
                        <input placeholder='Username' required type='text' value={this.state.username} onChange={event => this.handleUsernameChange(event)} />
                    </Form.Field>
                    <Form.Field>
                        <input placeholder='Password' required type='password' value={this.state.password} onChange={event => this.handlePasswordChange(event)} />
                    </Form.Field>
                    <Button className="submit-button" fluid={true} onClick={event => this.handleSignInSubmit(event)}>Submit</Button>
                    <Message warning>{this.state.errmsg}</Message>
                    <p className='center-text'>
                        <Link to='/login'>Forgot password?</Link>
                    </p>
                </Form>
                <p className='center-text'>Don't have an account?
                    <Link to='/signup'> Sign Up</Link>
                </p>
                <br />
            </Container>
        )
    }
}

export default Login
