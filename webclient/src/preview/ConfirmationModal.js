import React, { Component } from 'react';
import { Segment, Modal, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

class ConfirmationModal extends Component {
    state = {
        visible: false
    }

    hideModal = (e) => this.setState({ visible: false })

    showModal = (e) => this.setState({ visible: true })

    render() {
        const { visible } = this.state
        const { currentStory } = this.props
        return (
            <Modal
                trigger={
                    <Button color='green' className='publish-button' onClick={this.showModal}>
                        Publish
                    </Button>
                }
                open={visible}
                onClose={this.hideModal}
                closeOnEscape={true}
                closeOnRootNodeClick={false}
                dimmer="blurring"
            >   
                <Modal.Header as='h2' className="modal-header">Publish Story</Modal.Header>
                <Modal.Content>
                    <Segment basic padded>
                        <Segment textAlign='center' basic>
                            Are you sure you are ready to publish your story? Your story will be available to the public. To make the story private again or if you want to edit it further, you can change the settings of the story on your Accounts page.
                        </Segment>
                    </Segment>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.hideModal} color='red' className='cancel-button' style={{color:"white"}}>
                        Cancel
                    </Button>
                    <Link className='ui button green modal-publish-button' to={`/story/${currentStory.id}/confirmation`}>
                        Publish
                    </Link>
                </Modal.Actions>
            </Modal>
                )
    }
}


const mapStateToProps = (state) => {
    return {
        currentStory: state.currentStory,
    }
}

export default connect(mapStateToProps)(ConfirmationModal)