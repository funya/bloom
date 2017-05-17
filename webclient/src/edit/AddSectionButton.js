import React, { Component } from 'react'
import { Segment, Menu, Button, Header, Grid, Modal, Icon, Form, TextArea, Message, Input, Image } from 'semantic-ui-react'
import 'whatwg-fetch'
import { apiRoot, storageKey } from '../authentication/Auth'


class AddSectionButton extends Component {
    state = {
        visibleAddModal: false,
        loading: false,
        imageUrl: "",
        sectiontext: "",
    }

    // Event handler that is called when save is clicked in the editing modal.
    // A POST fetch call is made to submit the new item to the DB
    submitNewSection = (e) => {
        e.preventDefault()
        this.setState({ loading: false })

        if (this.state.inputType === "picture") {
            var img64 = new FileReader()
            img64.readAsDataURL(this.state.image)
            img64.onload = () => {
                fetch(`${apiRoot}/sections`, {
                    method: 'post',
                    mode: "cors",
                    headers: new Headers({
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem(storageKey)
                    }),
                    body: JSON.stringify({
                        body: this.state.sectiontext,
                        storyid: this.props.storyid,
                        image: img64.result,
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
                        console.log(data)
                        this.setState({ loading: false, visibleAddModal: false, sectiontext: "", image: null, imageUrl: "",inputType: null })
                        this.props.fetchSections()
                    })
                    .catch(err => {
                        this.setState({ loading: false })
                        this.props.fetchSections()
                        console.log(err)
                        return null
                    })
            }
        } else {
            fetch(`${apiRoot}/sections`, {
                method: 'post',
                mode: "cors",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem(storageKey)
                }),
                body: JSON.stringify({
                    body: this.state.sectiontext,
                    storyid: this.props.storyid
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
                    console.log(data)
                    this.setState({ loading: false, visibleAddModal: false, sectiontext: "", inputType: null })
                    this.props.fetchSections()
                })
                .catch(err => {
                    this.setState({ loading: false })
                    this.props.fetchSections()
                    console.log(err)
                    return null
                })
        }
    }

    showAddModal = (e) => this.setState({ visibleAddModal: true, })

    hideAddModal = (e) => this.setState({ visibleAddModal: false, })

    showTextInput = (e) => {
        e.preventDefault()
        this.setState({ inputType: "text" })
    }

    showPictureInput = (e) => {
        e.preventDefault()
        this.setState({ inputType: "picture" })
    }

    handleTextSection = (e) => {
        this.setState({ sectiontext: e.target.value })
    }

    handleCaption = (e) => this.setState({ imageCaption: e.target.value })

    handleImage = (e) => {
        e.preventDefault()
        this.setState({ imageUrl: URL.createObjectURL(e.target.files[0]), image: e.target.files[0] })
    }

    render() {
        console.log("Rendering AddSectionButton: ", this.state, this.props)
        return (
            <Modal
                trigger={
                    <div className='section-grid-item-container section-grid-item-add' onClick={this.showAddModal}>
                        <Icon name='plus square outline' size='massive'></Icon>
                    </div>
                }
                dimmer="inverted"
                open={this.state.visibleAddModal}
                onClose={this.hideAddModal}
                closeOnEscape={true}
                closeOnRootNodeClick={false}
            >
                <Modal.Header as='h3'> <Icon name='plus square outline' />Add Section</Modal.Header>
                <Modal.Content>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column as={Menu} icon vertical tabular className='input-menu'>
                                <Menu.Item>
                                    <Button icon='picture' primary onClick={(event) => this.showPictureInput(event)} />
                                </Menu.Item>
                                <Menu.Item>
                                    <Button icon='font' onClick={(event) => this.showTextInput(event)} />
                                </Menu.Item>
                            </Grid.Column>
                            <Grid.Column as={Segment} basic width='14'>
                                {!this.state.inputType &&
                                    <Header as='h1' textAlign='center' className='first-prompt-message'>
                                        <Icon name='long arrow left' size='huge' />
                                        Select a type of input first
                                    </Header>
                                }
                                <Segment basic className='input-container'>
                                    {this.state.inputType && (
                                        this.state.inputType === "picture" ? (
                                            <Form loading={this.state.loading}>
                                                <Form.Field>
                                                    <Image src={this.state.imageUrl} />
                                                    <Form.Input as='input' type='file' accept='image/*' onChange={this.handleImage} />
                                                </Form.Field>
                                                <Form.Input type='text' placeholder='Optional Caption / Description' value={this.state.sectiontext} onChange={this.handleTextSection} />
                                            </Form>
                                        ) : (
                                                <Form loading={this.state.loading}>
                                                    <TextArea value={this.state.sectiontext} onChange={this.handleTextSection} placeholder='Tell us your story' />
                                                    <Message warning>Submitted</Message>
                                                </Form>
                                            )
                                    )
                                    }
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='red' onClick={this.hideAddModal} inverted className='cancel-button'>
                        <Icon name='long arrow left' /> Exit
                    </Button>
                    <Button color='green' inverted onClick={this.submitNewSection}>
                        <Icon name='save' /> Submit
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default AddSectionButton