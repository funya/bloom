import React, { Component } from 'react';
import { Item, Button, Icon, Label, Modal, Checkbox } from 'semantic-ui-react'
import moment from "moment";
import { Link } from 'react-router-dom';
import 'whatwg-fetch'
import { apiRoot, storageKey } from '../authentication/Auth'

class StoryItem extends Component {
    state = {
        visibleDeleteModal: false,
        checked: this.props.private,
    }

    showDeleteModal = (e) => this.setState({ visibleDeleteModal: true, })
    hideDeleteModal = (e) => this.setState({ visibleDeleteModal: false, })

    // Event handler that triggers when delete butotn is clicked on delete prompt window
    // deletes the section 
    deleteStory = (e) => {
        fetch(`${apiRoot}/stories/${this.props.id}`, {
            mode: "cors",
            method: "DELETE",
            headers: new Headers({
                "Authorization": localStorage.getItem(storageKey)
            })
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    return Promise.reject({
                        status: resp.status,
                        statusText: resp.statusText,
                        statusMessage: resp.text()
                    })
                }
            })
            .then(data => {
                this.props.fetchStories()
                console.log(data)
            })
            .catch(err => {
                this.props.fetchStories()
                console.log(err)
                return null
            })
        this.setState({ visibleDeleteModal: false })
    }

    toggleStoryPrivacy(e, d) {
        e.preventDefault()
        this.setState({ checked: !this.state.checked })
        fetch(`${apiRoot}/stories/${this.props.id}`, {
            mode: "cors",
            method: "PATCH",
            headers: new Headers({
                "Authorization": localStorage.getItem(storageKey)
            }),
            body: JSON.stringify({
                name: this.props.name,
                description: this.props.description,
                private: !this.props.private
            })
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    return Promise.reject({
                        status: resp.status,
                        statusText: resp.statusText,
                        statusMessage: resp.text()
                    })
                }
            })
            .then(data => {
                this.props.fetchStories()
                console.log(data)
            })
            .catch(err => {
                this.props.fetchStories()
                console.log(err)
                return null
            })
    }

    render() {
        let { createdAt } = this.props
        return (
            <Modal
                trigger={
                    <Item className='story-item'>
                        <Item.Content>
                            <Item.Header as='h3'>{this.props.name}</Item.Header>
                            <Item.Meta>
                                <span>Created: {moment(createdAt).format("LLL")}</span>
                            </Item.Meta>
                            <Item.Description>{this.props.description}</Item.Description>
                            <Item.Extra>
                                <div className='story-buttons'>
                                    <Link className='ui button edit-story-button' to={{ pathname: `/story/${this.props.id}/edit`, state: { id: this.props.id, name: this.props.name } }}>
                                        Edit story
                                    <Icon name='chevron right' />
                                    </Link>
                                    <Button className='delete-story-button' color='red' icon='delete' labelPosition='right' content="Delete" onClick={this.showDeleteModal} />
                                </div>
                                <Checkbox toggle label="Private" onChange={(event, data) => this.toggleStoryPrivacy(event, data)} checked={this.state.checked} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                }
                open={this.state.visibleDeleteModal}
                onClose={this.hideDeleteModal}
                basic
            >
                <Modal.Header as='h3'> <Icon name='warning' color='red' />Delete Story</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete this story? Once it's deleted, <strong>all</strong> the content contained within this story, including all the text and pictures will be gone <strong>forever</strong>.</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='green' inverted onClick={this.hideDeleteModal}>
                        <Icon name='long arrow left' /> Cancel
                        </Button>
                    <Button color='red' inverted onClick={this.deleteStory}>
                        <Icon name='trash outline' /> Delete
                        </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default StoryItem