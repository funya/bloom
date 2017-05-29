import React, { Component } from 'react';
import { Segment, Modal, Icon, Popup, Button, Form, Header, Message } from 'semantic-ui-react';

class HelpModal extends Component {
    state = {
        visible: false,
    }

    hideModal = (e) => this.setState({ visible: false })

    showModal = (e) => this.setState({ visible: true })

    render() {
        const { visible, title, description } = this.state
        const { fetching, fetchError } = this.props
        return (
            <Modal
                trigger={
                    <Button color='blue' onClick={this.showModal}>Help</Button>
                }
                open={visible}
                onClose={this.hideModal}
                dimmer="blurring"
            >
                <Modal.Header as='h2' className="modal-header">Help</Modal.Header>
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
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.hideModal} className='cancel-button'> Exit </Button>
                    <div style={{clear:"both"}}></div>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default HelpModal