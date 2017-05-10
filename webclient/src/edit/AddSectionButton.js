import React, { Component } from 'react'
import { Segment, Menu, Button, Header, Grid, Modal, Icon, Form, TextArea, Message } from 'semantic-ui-react'
import 'whatwg-fetch'
import { apiRoot, storageKey } from '../authentication/Auth'


class AddSectionButton extends Component {
    state = {
        visibleAddModal: false,
        loading: false
    }

    // Event handler that is called when save is clicked in the editing modal.
    // A POST fetch call is made to submit the new item to the DB
    submitTextAreaBody = (e) => {
        this.setState({ loading: true})
        e.preventDefault()
        fetch(`${apiRoot}/sections`, {
            method: 'post',
            mode: "cors",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem(storageKey)
            }),
            body: JSON.stringify({
                body: this.state.textareabody,
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
                this.setState({ loading: false, visibleAddModal: false, textareabody: "", inputType: null })
            })
            .catch(err => {
                this.setState({ loading: false })
                console.log(err)
                return null
            })
        this.props.fetchSections()
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

    handleTextareaBody = (e) => {
        this.setState({ textareabody: e.target.value, })
    }

    render() {
        console.log("Rendering AddSectionButton: ", this.state)
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
                                            <Form>
                                                <Form.Field>
                                                    <Form.Input as='input' type='file' accept='image/*' />
                                                </Form.Field>
                                                <Form.Input type='text' placeholder='Optional Caption / Description' />
                                            </Form>
                                        ) : (
                                                <Form loading={this.state.loading}>
                                                    <TextArea value={this.state.textareabody} onChange={event => this.handleTextareaBody(event)} placeholder='Tell us your story' />
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
                    <Button color='green' inverted onClick={this.submitTextAreaBody}>
                        <Icon name='save' /> Submit
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default AddSectionButton