import React, { Component } from 'react';
import { Form, Header, Container, Button, Image, Message, Segment } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import { isEmpty } from 'lodash';
import  ScrollToTop from '../components/ScrollToTop';

import './Login_Signup.css';
import image from '../img/lotus.svg';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sendResetCode } from '../redux/actions';

class Reset extends Component {
    state = {
        email: "",
        successmessage: ""
    }

    handleEmailChange = (event) => this.setState({ email: event.target.value })

    submit = (event) => {
        event.preventDefault()

        const { email } = this.state
        this.props.sendResetCode(this, email)
    }

    render() {
        const { fetching, fetchError, currentUser } = this.props
        const { email, successmessage } = this.state

        if (!isEmpty(this.props.currentUser)) {
            return <Redirect to={"/account"} />
        }

        return (
            <Container className='logincontainer'>
                <ScrollToTop />
                <Header id="title" textAlign='center' as='h1' style={{marginTop:"50px"}}>
                    <Image src={image} alt='logo' />
                    Bloom
                </Header>
                <Form id='signup' onSubmit={this.submit} loading={fetching.count !== 0} warning={fetchError.length > 0 && fetching.fetch !== "check session"}>
                    <Header textAlign='center' as='h2'> Reset Password</Header>
                    <Form.Field>
                        <input placeholder='Email Address' required type='email' value={email} onChange={this.handleEmailChange} />
                    </Form.Field>
                    <Message warning>{fetchError}</Message>
                    {
                        successmessage.length > 0 && (
                            <Message color='blue'>{successmessage}</Message>
                        )
                    }
                    <Button className="submit-button" color='green' fluid={true} onClick={this.submit}>Submit</Button>
                </Form>
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
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Reset)