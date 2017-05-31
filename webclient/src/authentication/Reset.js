import React, { Component } from 'react';
import { Form, Header, Container, Button, Image, Message, Segment } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { isEmpty } from 'lodash';
import ScrollToTop from '../components/ScrollToTop';

import './Login_Signup.css';
import image from '../img/lotus.svg';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sendResetCode, verifyCode } from '../redux/actions';

class Reset extends Component {
    state = {
        email: "",
        successmessage: "",
        code: "",
        pw1: "",
        pw2: ""
    }

    handleEmailChange = (event) => this.setState({ email: event.target.value })

    handleCodeChange = (event) => this.setState({ code: event.target.value })

    handlePassword1Change = (event) => this.setState({ pw1: event.target.value })

    handlePassword2Change = (event) => this.setState({ pw2: event.target.value })

    sendCode = (event) => {
        event.preventDefault()

        const { email } = this.state
        this.props.sendResetCode(this, email)
    }

    verifyCode = (event) => {
        event.preventDefault()

        const { code, pw1, pw2, email } = this.state
        this.props.verifyCode(this, code, email, pw1, pw2)
    }

    render() {
        const { fetching, fetchError, currentUser } = this.props
        const { email, successmessage, code, pw1, pw2 } = this.state

        if (!isEmpty(this.props.currentUser)) {
            return <Redirect to={"/account"} />
        }

        return (
            <Container className='logincontainer'>
                <ScrollToTop />
                <Header id="title" textAlign='center' as='h1' style={{ marginTop: "50px" }}>
                    <Image src={image} alt='logo' />
                    Bloom
                </Header>
                {
                    (successmessage.length) > 0 ? (
                        <Form id='signup' onSubmit={this.verifyCode} loading={fetching.count !== 0} warning={(fetchError.length > 0 && fetching.fetch.includes("password"))}>
                            <Header textAlign='center' as='h2'> Reset Password</Header>
                            <Message color='blue'>{successmessage}</Message>
                            <Form.Field>
                                <input placeholder='Code' required type='text' value={code} onChange={this.handleCodeChange} />
                            </Form.Field>
                            <Form.Field>
                                <input placeholder='New Password' required type='password' value={pw1} onChange={this.handlePassword1Change} />
                            </Form.Field>
                            <Form.Field>
                                <input placeholder='Confirm New Password' required type='password' value={pw2} onChange={this.handlePassword2Change} />
                            </Form.Field>
                            <Message warning>{fetchError}</Message>
                            <Button className="submit-button" color='green' fluid={true} onClick={this.verifyCode}>Submit</Button>
                        </Form>
                    ) : (
                            <Form id='signup' onSubmit={this.sendCode} loading={fetching.count !== 0} warning={fetchError.length > 0 && fetching.fetch.includes("code")}>
                                <Header textAlign='center' as='h2'> Reset Password</Header>
                                <Form.Field>
                                    <input placeholder='Email Address' required type='email' value={email} onChange={this.handleEmailChange} />
                                </Form.Field>
                                <Message warning>{fetchError}</Message>
                                <Button className="submit-button" color='green' fluid={true} onClick={this.sendCode}>Submit</Button>
                            </Form>
                        )
                }
            </Container>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        fetching: state.fetching,
        fetchError: state.fetchError,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        sendResetCode,
        verifyCode
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Reset)