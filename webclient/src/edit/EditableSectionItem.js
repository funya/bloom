import React, { Component } from 'react';
import { Container, Segment, Icon, Input, Button, Loader, Dimmer, Modal, Card, Grid, Menu, Header, Form, TextArea, Message } from 'semantic-ui-react'
import 'whatwg-fetch'
import { apiRoot, storageKey } from '../authentication/Auth'

class EditableSectionItem extends Component {
    state = {
        visibleEditModal: false,
        visibleDeleteModal: false,
        loading: false,
        textareabody: this.props.value.body,
    }

    showEditModal = (e) => this.setState({ visibleEditModal: true, })
    hideEditModal = (e) => this.setState({ visibleEditModal: false, })

    showDeleteModal = (e) => this.setState({ visibleDeleteModal: true, })
    hideDeleteModal = (e) => this.setState({ visibleDeleteModal: false, })

    // Event handler that triggers when delete butotn is clicked on delete prompt window
    // deletes the section 
    deleteSection = (e) => {
        this.setState({loading: true})
        fetch(`${apiRoot}/sections/${this.props.value.id}`, {
            mode: "cors",
            method: "DELETE",
            headers: new Headers({
                "Authorization": localStorage.getItem(storageKey)
            })
        })
            .then(resp => {
                if (resp.ok) {
                    this.setState({loading: false})
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
                console.log(data)
            })
            .catch(err => {
                console.log(err)
                return null
            })
        this.setState({ visibleDeleteModal: false })
        this.props.fetchSections()
    }

    editSection = (e) => {
        this.setState({loading: true})
        fetch(`${apiRoot}/sections/${this.props.value.id}`, {
            mode: "cors",
            method: "PATCH",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem(storageKey)
            }),
             body: JSON.stringify({
                body: this.state.textareabody
            })
        })
            .then(resp => {
                if (resp.ok) {
                    this.setState({loading: false})
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
                console.log(data)
            })
            .catch(err => {
                console.log(err)
                return null
            })
        this.setState({ visibleEditModal: false })
        this.props.fetchSections()
    }

    handleTextareaBody = (e) => {
        this.setState({ textareabody: e.target.value, })
    }

    render() {
        console.log("Rendering EditableSectionItem: ", this.state)
        return (
            <Modal
                trigger={
                    <div className='section-grid-item-container'>
                        <div className='menu-icons'>
                            <Icon name='content' className='reorder-icon' size='large' />
                            <div className='menu-icons-right'>
                                <Icon name='pencil' className='edit-icon' color='blue' size='large' onClick={this.showEditModal} />
                                <Icon name='trash outline' className='trash-icon' size='large' color='red' onClick={this.showDeleteModal} />
                            </div>
                        </div>
                        <Card className='section-grid-item-content'>
                            <Card.Content description={this.props.value.body} />
                        </Card>
                        <Modal basic open={this.state.visibleDeleteModal} onClose={this.hideDeleteModal}>
                            <Modal.Header as='h3'> <Icon name='warning' color='red' />Delete Section</Modal.Header>
                            <Modal.Content>
                                <p>Are you sure you want to delete this section? Once it's deleted, it will be gone <strong>forever</strong>.</p>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button basic color='green' inverted onClick={this.hideDeleteModal}>
                                    <Icon name='long arrow left' /> Cancel
                                </Button>
                                <Button color='red' inverted onClick={this.deleteSection}>
                                    <Icon name='trash outline' /> Delete
                                </Button>
                            </Modal.Actions>
                        </Modal>
                    </div>
                }
                dimmer="inverted"
                open={this.state.visibleEditModal}
                onClose={this.hideEditModal}
                closeOnEscape={true}
                closeOnRootNodeClick={false}
            >
                <Modal.Header as='h3'> <Icon name='plus square outline' />Add Section</Modal.Header>
                <Modal.Content>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column as={Menu} icon vertical tabular className='input-menu'>
                                <Menu.Item>
                                    <Button icon='picture' primary disabled />
                                </Menu.Item>
                                <Menu.Item>
                                    <Button icon='font' />
                                </Menu.Item>
                            </Grid.Column>
                            <Grid.Column as={Segment} basic width='14'>
                                <Segment basic className='input-container'>
                                    <Form loading={this.state.loading}>
                                        <TextArea value={this.state.textareabody} onChange={event => this.handleTextareaBody(event)} placeholder='Tell us your story' />
                                    </Form>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' onClick={this.hideEditModal} inverted className='cancel-button'>
                        <Icon name='long arrow left' /> Exit
                    </Button>
                    <Button color='green' inverted onClick={this.editSection}>
                        <Icon name='save' /> Save
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default EditableSectionItem