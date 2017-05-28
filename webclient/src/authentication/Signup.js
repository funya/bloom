import React, { Component } from 'react';
import { Form, Header, Container, Button, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import  ScrollToTop from '../components/ScrollToTop';
import image from '../img/lotus.svg';
import { isEmpty } from 'lodash';
//stylesheet shared with login
import './Login_Signup.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signUp } from '../redux/actions';


class Signup extends Component {
    state = {
        e: "",
        u: "",
        p1: "",
        p2: "",
    }

    handleEmailChange = (event) => this.setState({ e: event.target.value })
    handleUsernameChange = (event) => this.setState({ u: event.target.value })
	handlePasswordChange = (event) => this.setState({ p1: event.target.value })
    handlePasswordConfChange = (event) => this.setState({ p2: event.target.value })

    submit = (event) => {
        event.preventDefault()
        const { e, u, p1, p2 } = this.state
        this.props.signUp(e, u, p1, p2)
        .then(resp => {
            !isEmpty(this.props.currentUser) && ( 
                this.props.history.push("/account")
            )
        })
    }

    render() {
        const { e, u, p1, p2 } = this.state
        const { fetchError, fetching, signUp, currentUser } = this.props
        return (
            <Container className='logincontainer'>
                <ScrollToTop />
                <Header id="title" textAlign='center' as='h1'>
                    <img src={image} alt='logo' />
                    Bloom
                </Header>
                <Form id='signup' onSubmit={this.submit} loading={fetching.count !== 0} warning={fetchError.length > 0}>
                    <Header textAlign='center' as='h2'> Sign Up</Header>
                    <Form.Field required>
                        <input placeholder='Email address*' type='email' value={e} onChange={this.handleEmailChange} />
                    </Form.Field>
                    <Form.Field required>
                        <input placeholder='Username' type='text' value={u} onChange={this.handleUsernameChange} />
                    </Form.Field>
                    <Form.Field required>
                        <input placeholder='Password' type='password' value={p1} onChange={this.handlePasswordChange} />
                    </Form.Field>
                    <Form.Field required>
                        <input placeholder='Confirm Password' type='password' value={p2} onChange={this.handlePasswordConfChange} />
                    </Form.Field>
                    <Message warning>{fetchError}</Message>
                    <Button className="submit-button" color='green' fluid={true} onClick={this.submit}>Submit</Button>
                    <p className='center-text'>
                        By signing up, you agree to the <Link to='/tos'>Terms of Service </Link> and <Link to='/privacy'>Privacy Policy</Link>
                    </p><br />
                    <p id="disclaimer">*Disclaimer: your email address is for the use of API Chaya alone and will never be displayed publically
                    </p>
                </Form>
                <p className='center-text'>Already have an account? <Link to='/login'>Log In</Link></p>
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
        signUp,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)