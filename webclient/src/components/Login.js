import React, { Component } from 'react';
import { Form, Header, Container, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';


import image from '../img/image.png'

class Login extends Component {
    render() {
        return (
            <Container>
                <Header size='huge' textAlign='center'>
                    <img src={image} alt='logo' />
                    Bloom
                </Header>
                <Form id='signup'>
                    <Header textAlign='center' size='large'> Log In</Header>
                    <Form.Field>
                        <input placeholder='Email address' />
                    </Form.Field>
                    <Form.Field>
                        <input placeholder='Password' />
                    </Form.Field>
                    <Button color='green' fluid={true} type='submit'>Submit</Button>
                    <p className='center-text'>
                        <Link to='/login'>Forgot password?</Link>
                    </p>
                </Form>
                <p className='center-text'>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
            </Container>
        )
    }
}

export default Login