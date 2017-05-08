import React, { Component } from 'react';
import { Form, Header, Container, Button, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import image from '../img/lotus.svg'

//stylesheet shared with login
import './Login_Signup.css'
import { Auth } from './Auth'

class Signup extends Component {
    state = {
        emailaddr: "",
        username: "",
        password: "",
        passwordconf: "",
        loading: false,
        error: false,
        errmsg: ""
    }

    handleEmailChange = (event) => this.setState({ emailaddr: event.target.value })
    handleUsernameChange = (event) => this.setState({ username: event.target.value })
    handlePasswordChange = (event) => this.setState({ password: event.target.value })
    handlePasswordConfChange = (event) => this.setState({ passwordconf: event.target.value })

    handleNewUserSubmit = (event) => {
        event.preventDefault();

        Auth.signup(this, this.state.emailaddr, this.state.username, this.state.password, this.state.passwordconf)
    }

    render() {
        return (
            <Container>
                <Header id="title" textAlign='center' as='h1'>
                    <img src={image} alt='logo' />
                    Bloom
                </Header>
                <Form id='signup' onSubmit={event => this.handleNewUserSubmit(event)} loading={this.state.loading} warning={this.state.error}>
                    <Header textAlign='center' as='h2'> Sign Up</Header>
                    <Form.Field required>
                        <input placeholder='Email address*' type='email' value={this.state.emailaddr} onChange={event => this.handleEmailChange(event)}/>
                    </Form.Field>
                    <Form.Field required>
                        <input placeholder='Username' type='text' value={this.state.username} onChange={event => this.handleUsernameChange(event)}/>
                    </Form.Field>
                    <Form.Field required>
                        <input placeholder='Password' type='password' value={this.state.password} onChange={event => this.handlePasswordChange(event)}/>
                    </Form.Field>
                    <Form.Field required>
                        <input placeholder='Confirm Password' type='password' value={this.state.passwordconf} onChange={event => this.handlePasswordConfChange(event)}/>
                    </Form.Field>
                    <Button className="submit-button" fluid={true} onClick={event => this.handleNewUserSubmit(event)}>Submit</Button>
                    <Message warning>{this.state.errmsg}</Message>
                    <p className='center-text'>
                        By signing up, you agree to the <a href="">Terms of Service</a> and <a href="">Privacy Policy</a>
                    </p><br/>
                    <p id="disclaimer">*Disclaimer: your email address is for the use of API Chaya alone and will never be displayed publically
                    </p>
                </Form>
                <p className='center-text'>Already have an account? <Link to='/login'>Log In</Link></p>
                <br/>
            </Container> 
        )
    }
}

export default Signup