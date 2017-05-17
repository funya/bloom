import React, { Component } from 'react';
import { Container, Segment, Icon, Input, Button, Loader, Dimmer, Modal, Card, Grid, Menu, Header, Form, TextArea, Message, Image } from 'semantic-ui-react'
import 'whatwg-fetch'
import { apiRoot, storageKey } from '../authentication/Auth'

class EditableSectionItem extends Component {
    state = {
        visibleEditModal: false,
        visibleDeleteModal: false,
        loading: false,
        sectiontext: this.props.value.body,
        image: this.props.value.image,
        imageUrl: ""
    }

    showEditModal = (e) => this.setState({ visibleEditModal: true, })
    hideEditModal = (e) => this.setState({ visibleEditModal: false, })

    showDeleteModal = (e) => this.setState({ visibleDeleteModal: true, })
    hideDeleteModal = (e) => this.setState({ visibleDeleteModal: false, })

    // Event handler that triggers when delete butotn is clicked on delete prompt window
    // deletes the section 
    deleteSection = (e) => {
        this.setState({ loading: true })
        fetch(`${apiRoot}/sections/${this.props.value.id}`, {
            mode: "cors",
            method: "DELETE",
            headers: new Headers({
                "Authorization": localStorage.getItem(storageKey)
            })
        })
            .then(resp => {
                if (resp.ok) {
                    this.setState({ loading: false })
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
                this.setState({ visibleDeleteModal: false })
                this.props.fetchSections()
            })
            .catch(err => {
                console.log(err)
                this.setState({ visibleDeleteModal: false })
                this.props.fetchSections()
                return null
            })
    }

    editSection = (e) => {
        this.setState({ loading: true })

        if (this.state.imageUrl.length > 0) {
            var img64 = new FileReader()
            img64.readAsDataURL(this.state.image)
            img64.onload = () => {
                console.log(img64.result)
                fetch(`${apiRoot}/sections/${this.props.value.id}`, {
                    mode: "cors",
                    method: "PATCH",
                    headers: new Headers({
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem(storageKey)
                    }),
                    body: JSON.stringify({
                        body: this.state.sectiontext,
                        image: img64.result
                    })
                })
                    .then(resp => {
                        if (resp.ok) {
                            this.setState({ loading: false })
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
                        this.props.fetchSections()
                    })
                    .catch(err => {
                        console.log(err)
                        this.props.fetchSections()
                        return null
                    })
                this.setState({ visibleEditModal: false })
            }
        } else {
            fetch(`${apiRoot}/sections/${this.props.value.id}`, {
                mode: "cors",
                method: "PATCH",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem(storageKey)
                }),
                body: JSON.stringify({
                    body: this.state.sectiontext,

                })
            })
                .then(resp => {
                    if (resp.ok) {
                        this.setState({ loading: false, imageUrl: "" })
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
                    this.props.fetchSections()
                })
                .catch(err => {
                    console.log(err)
                    this.props.fetchSections()
                    return null
                })
            this.setState({ visibleEditModal: false })
        }
    }

    handleTextSection = (e) => {
        this.setState({ sectiontext: e.target.value, })
    }

    handleImage = (e) => {
        e.preventDefault()
        this.setState({ imageUrl: URL.createObjectURL(e.target.files[0]), image: e.target.files[0] })
    }
    render() {
        console.log("Rendering EditableSectionItem: ", this.state, this.props)
        let haspicture = this.props.value.image.length > 0
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
                            {
                                haspicture ? (
                                    <Image src={this.props.value.image} />
                                ) : (
                                        <Card.Content description={this.props.value.body} />
                                    )
                            }
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
                <Modal.Header as='h3'> <Icon name='pencil' />Edit Section</Modal.Header>
                <Modal.Content>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column as={Menu} icon vertical tabular className='input-menu'>
                                <Menu.Item>
                                    <Button icon='picture' primary disabled={!haspicture} />
                                </Menu.Item>
                                <Menu.Item>
                                    <Button icon='font' disabled={haspicture} />
                                </Menu.Item>
                            </Grid.Column>
                            <Grid.Column as={Segment} basic width='14'>
                                <Segment basic className='input-container'>
                                    {haspicture ? (
                                        <Form loading={this.state.loading}>
                                            <Form.Field>
                                                {
                                                    this.state.imageUrl.length > 0 ? (
                                                        <Image src={this.state.imageUrl} />
                                                    ) : (
                                                            <Image src={this.props.value.image} />
                                                        )
                                                }
                                                <Form.Input as='input' type='file' accept='image/*' onChange={this.handleImage} />
                                            </Form.Field>
                                            <Form.Input type='text' placeholder='Optional Caption / Description' value={this.state.sectiontext} onChange={this.handleTextSection} />
                                        </Form>
                                    ) : (
                                            <Form loading={this.state.loading}>
                                                <TextArea value={this.state.sectiontext} onChange={this.handleTextSection} placeholder='Tell us your story' />
                                            </Form>
                                        )
                                    }
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