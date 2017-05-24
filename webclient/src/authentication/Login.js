import React, { Component } from 'react';
import { Form, Header, Container, Button, Image, Message, Segment } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { isEmpty } from 'lodash';

import './Login_Signup.css';
import image from '../img/lotus.svg';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signIn } from '../redux/actions';

class Login extends Component {
    state = {
        username: "",
        password: "",
    }

    handlePasswordChange = (event) => this.setState({ password: event.target.value })

    handleUsernameChange = (event) => this.setState({ username: event.target.value })

    login = (event) => {
        event.preventDefault()

        const { username, password } = this.state
        this.props.signIn(username, password)
    }

    render() {
        const { fetching, fetchError, currentUser } = this.props
        const { username, password } = this.state

        if (!isEmpty(this.props.currentUser)) {
            return <Redirect to={"/account"} />
        }

        return (
            <Container className='logincontainer'>

                <Header id="title" textAlign='center' as='h1'>
                    <Image src={image} alt='logo' />
                    Bloom
                </Header>
                <Form id='signup' onSubmit={this.login} loading={fetching.count !== 0} warning={fetchError.length > 0 && fetching.fetch !== "check session"}>
                    <Header textAlign='center' as='h2'> Sign In</Header>
                    <Form.Field>
                        <input placeholder='Username' required type='text' value={username} onChange={this.handleUsernameChange} />
                    </Form.Field>
                    <Form.Field>
                        <input placeholder='Password' required type='password' value={password} onChange={this.handlePasswordChange} />
                    </Form.Field>
                    <Message warning>{fetchError}</Message>
                    <Button className="submit-button" fluid={true} onClick={this.login}>Submit</Button>
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

const mapStateToProps = (state) => {
    return {
        fetching: state.fetching,
        fetchError: state.fetchError,
        currentUser: state.currentUser,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        signIn,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
