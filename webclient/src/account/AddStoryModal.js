import React, { Component } from 'react'
import { Segment, Modal, Icon, Popup, Button, Form, Header, Message } from 'semantic-ui-react'

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
        this.props.createStory(title, description)
            .then(data => {
                //createStory call returns back the id of the created story,
                //if we geet back an id then the story was made and we could close the modal
                if (data.length > 0 ) {
                    this.setState({ visible: false, title: "", description: "" })
                    //go to edit screen of that story
                }
            })
    }

    render() {
        const { visible, title, description } = this.state
        const { fetching, fetchError } = this.props
        return (
            <Modal
                trigger={
                    <Button fluid size='large' onClick={this.showModal} id='add-story-button' color='green'>Add new story</Button>
                }
                open={visible}
                onClose={this.hideModal}
            >
                <Modal.Header as='h2'>Add New Story</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Segment basic padded>
                            <Header as='h3' textAlign='center'>Starting is the hardest part. Here are some suggestions to guide you.</Header>
                            <ul>
                                <li>Start with facts. Focus on the facts of what happened. Who, what, when, and where?</li>
                                <li>Add thoughts and feelings. How did you feel? How do you feel now?</li>
                                <li>Dig deeper. Add as much detail as you’re comfortable with. </li>
                            </ul>
                            <Header as='h4' textAlign='center'>These are only suggestions. This is your story to tell. Thank you for your courageous voice. </Header>
                        </Segment>
                        <Segment basic padded>
                            <Header as='h3' textAlign='center'>Story Information</Header>
                            <Form loading={fetching.count !== 0} warning={fetchError.length > 0} onSubmit={this.add}>
                                <Form.Input type='text' placeholder='Story Title' value={title} onChange={this.handleNameInput} />
                                <Form.Input type='text' placeholder='Description (Optional)' value={description} onChange={this.handleDescriptionInput} />
                                <Message warning>{fetchError}</Message>
                            </Form>
                        </Segment>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' onClick={this.hideModal}> Cancel </Button>
                    <Button positive icon='checkmark' labelPosition='right' content="Create" onClick={this.add} />
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

export default connect(mapStateToProps, mapDispatchToProps)(AddStorymodal)