import React, { Component } from 'react';
import { Form, Header, Container, Button, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';


//stylesheet shared with Signup
import './Login_Signup.css'

import image from '../img/lotus.svg'

class Login extends Component {
    render() {
        return (
            <Container>
                <Header id="title" textAlign='center' as='h1'>
                    <Image src={image} alt='logo'/>
                    Bloom
                </Header>
                <Form id='signup'>
                    <Header textAlign='center' size='large'> Sign In</Header>
                    <Form.Field>
                        <input placeholder='Username' type='text'/>
                    </Form.Field>
                    <Form.Field>
                        <input placeholder='Password' type='password'/>
                    </Form.Field>
                    <Button className="submit-button" fluid={true}>Submit</Button>
                    <p className='center-text'>
                        <Link to='/login'>Forgot password?</Link>
                    </p>
                </Form>
                <p className='center-text'>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
                <br/>
            </Container>
        )
    }
}

export default Login