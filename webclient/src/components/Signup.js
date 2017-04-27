import React, { Component } from 'react';
import { Form, Header, Container, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

import image from '../img/lotus.svg'

//stylesheet shared with login
import './Login_Signup.css'

class Signup extends Component {
    render() {
        return (
            <Container>
                <Header id="title" size='huge' textAlign='center'>
                    <img src={image} alt='logo' />
                    Bloom
                </Header>
                <Form id='signup'>
                    <Header textAlign='center' size='large'> Sign Up</Header>
                    <Form.Field>
                        <input placeholder='Email address*' type='email'/>
                    </Form.Field>
                    <Form.Field>
                        <input placeholder='Username' type='text'/>
                    </Form.Field>
                    <Form.Field>
                        <input placeholder='Password' type='password'/>
                    </Form.Field>
                    <Form.Field>
                        <input placeholder='Confirm Password' type='password'/>
                    </Form.Field>
                    <Button className="submit-button" fluid={true} >Submit</Button>
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