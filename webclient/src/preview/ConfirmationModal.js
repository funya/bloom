import React, { Component } from 'react';
import { Segment, Modal, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


class ConfirmationModal extends Component {
    state = {
        visible: false
    }

    hideModal = (e) => this.setState({ visible: false })

    showModal = (e) => this.setState({ visible: true })

    render() {
        const { visible } = this.state
        const { story } = this.props
        return (
            <Modal
                trigger={
                    <Button color='green' className='publish-button' onClick={this.showModal}>
                        Publish
                    </Button>
                }
                dimmer="inverted"
                open={visible}
                onClose={this.hideModal}
                closeOnEscape={true}
                closeOnRootNodeClick={false}
                closeIcon='close'
            >
                <Modal.Header as='h2'> Publish Story</Modal.Header>
                <Modal.Content>
                    <Segment basic padded>
                        <Segment textAlign='center' basic>
                            Are you sure you are ready to publish your story? Your story will be available to the public. To make the story private again or if you want to edit it further, you can change the settings of the story on your Accounts page.
                        </Segment>
                    </Segment>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.hideModal} color='red' style={{ float: 'left' }}>
                        Cancel
                    </Button>
                    <Link className='ui button modal-publish-button' to={{ pathname: `/story/${story.id}/confirmation`, state: { story } }}>
                        Publish
                    </Link>
                </Modal.Actions>
            </Modal>
                )
    }
}

export default ConfirmationModal