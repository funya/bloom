import React, { Component } from 'react'
import { Segment, Modal, Icon, Popup, Button } from 'semantic-ui-react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deleteSection } from '../redux/actions';


class DeleteSectionModal extends Component {
    state = {
        visible: false
    }

    hideModal = (e) => this.setState({ visible: false })

    showModal = (e) => this.setState({ visible: true })

    delete = (e) => {
        e.preventDefault()
        this.props.deleteSection(this, this.props.section.id, this.props.section.storyid)
    }

    render() {
        const { visible } = this.state
        const { section } = this.props
        return (
            <Modal
                trigger={
                    <Popup
                        inverted
                        basic
                        trigger={<Icon name='trash outline' className='trash-icon' size='large' color='red' onClick={this.showModal} />}
                        content='Delete'
                    />
                }
                open={visible}
                onClose={this.hideModal}
                closeIcon='close'
                basic
            >
                <Modal.Header as='h2'> <Icon name='trash' color='red' />Delete Section</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete this section? Once it's deleted, it will be gone <strong>forever</strong>.</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='green' inverted onClick={this.hideModal} style={{ float: "left" }}>
                        <Icon name='long arrow left' /> Cancel
                        </Button>
                    <Button inverted color='red' onClick={this.delete}>
                        <Icon name='trash outline' /> Delete
                        </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        deleteSection
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(DeleteSectionModal)