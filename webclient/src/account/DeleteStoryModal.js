import React, { Component } from 'react'
import { Modal, Icon, Button, Form, Message } from 'semantic-ui-react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deleteStory } from '../redux/actions';


class DeleteStorymodal extends Component {
  state = {
    visible: false,
  }

  hideModal = (e) => this.setState({ visible: false })

  showModal = (e) => this.setState({ visible: true })

  delete = (event) => {
    event.preventDefault()
    this.props.deleteStory(this.props.storyid)
  }

  render() {
    const { visible, title, description } = this.state
    const { fetching, fetchError } = this.props
    return (
      <Modal
        trigger={
          <Button className='delete-story-button' color='red' icon='delete' labelPosition='right' content="Delete" onClick={this.showModal} />
        }
        open={visible}
        onClose={this.hideModal}
        basic
      >
        <Modal.Header as='h3'> <Icon name='warning' color='red' />Delete Story</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete this story? Once it's deleted, <strong>all</strong> the content contained within this story, including all the text and pictures will be gone <strong>forever</strong>.</p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='green' inverted onClick={this.hideModal}>
            <Icon name='long arrow left' /> Cancel
          </Button>
          <Button color='red' inverted onClick={this.delete}>
            <Icon name='trash outline' /> Delete
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    deleteStory
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(DeleteStorymodal)