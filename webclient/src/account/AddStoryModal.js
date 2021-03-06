import React, { Component } from 'react';
import { Segment, Modal, Icon, Popup, Button, Form, Header, Message } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStory } from '../redux/actions';


class AddStorymodal extends Component {
    state = {
        visible: false,
        title: "",
        description: ""
    }

    hideModal = (e) => this.setState({ visible: false })

    showModal = (e) => this.setState({ visible: true })

    handleNameInput = (e) => { this.setState({ title: e.target.value, }) }

    handleDescriptionInput = (e) => { this.setState({ description: e.target.value, }) }

    add = (event) => {
        event.preventDefault()
        const { title, description } = this.state
        this.props.createStory(this, title, description)
    }

    render() {
        const { visible, title, description } = this.state
        const { fetching, fetchError } = this.props
        return (
            <Modal
                trigger={
                    <Button fluid size='large' onClick={this.showModal} color='blue' id='add-story-button'>Add new story</Button>
                }
                open={visible}
                onClose={this.hideModal}
                dimmer="blurring"
            >
                <Modal.Header as='h2' className="modal-header"> <Icon name='plus square outline' color='blue' />Add New Story</Modal.Header>
                <Modal.Content className='modal-content-container'>
                    <Modal.Description>
                        <Segment basic padded>
                            <Header as='h3' textAlign='center'>Starting is the hardest part.</Header>
                            <Header as='h4' textAlign='center'>Here are some suggestions to guide you.</Header>
                            <ul className='subtext'>
                                <li>Start with facts. Focus on the facts of what happened. Who, what, when, and where?</li>
                                <li>Add thoughts and feelings. How did you feel? How do you feel now?</li>
                                <li>Dig deeper. Add as much detail as you’re comfortable with. </li>
                            </ul>
                            <Header as='h4' textAlign='center'>Here are some questions to think about.</Header>
                            <ul className='subtext'>
                                <li>How are you today?</li>
                                <li>Who's supporting you?</li>
                                <li>Is there something you'd like to say to them?</li>
                            </ul>
                            <Header as='h4' textAlign='center'>These are only suggestions. This is your story to tell. Thank you for being a part of this project. </Header>
                        </Segment>
                        <Segment basic padded>
                            <Form loading={fetching.count !== 0} warning={fetchError.length > 0} onSubmit={this.add}>
                                <Form.Input type='text' placeholder='Story Title' value={title} onChange={this.handleNameInput} />
                                <Form.Input type='text' placeholder='Description (Optional)' value={description} onChange={this.handleDescriptionInput} />
                                <Message warning>{fetchError}</Message>
                            </Form>
                        </Segment>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.hideModal} className='cancel-button'> Cancel </Button>
                    <Button color='green' content="Create" onClick={this.add} />
                </Modal.Actions>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        fetching: state.fetching,
        fetchError: state.fetchError
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        createStory
    }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddStorymodal))