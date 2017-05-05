import React, { Component } from 'react';
import { Container, Segment, Icon, Header, Input, Message, Image, Button, Loader, Dimmer, Modal, Menu, Popup, Label, Grid, TextArea, Form, Card } from 'semantic-ui-react'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import 'whatwg-fetch'

import Timeline from '../Timeline'
import EditTimeline from './EditTimeline'

import './edit.css';

let nextid = 1

class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            story: {},
            timelineitems: [],
            modalOpen: false,
            inputText: null,
            textareabody: "",
            loadingSections: false,
            loadingForm: false,
            submitSuccess: false,
        };
    }

    // Initialization of DOM nodes goes here. When the edit page is mounted, two fetch calls
    // are made to fetch the story and the sections of the story. 
    componentDidMount() {
        this.setState({ loadingSections: true })
        // Get the single story information 
        fetch(`http://rest.learncode.academy/api/bloom/stories/590aaa2a68f75b01005ad675`)
            .then(resp => resp.json())
            .then(data => {
                this.setState({ story: data })
                // After getting the ID of the story, fetch the sections related to this story
                return fetch(`http://rest.learncode.academy/api/bloom/sections`)
            })
            .then(resp => resp.json())
            .then(data => {
                this.setState({ timelineitems: data, loadingSections: false })
            })
            .catch(err => console.log(err))
    }

    // Event handler that manages the changing of the story title
    handleTimelineTitleChange = (event) => this.setState({ title: event.target.value })


    // Callback called when resorting of section ends
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState({
            timelineitems: arrayMove(this.state.timelineitems, oldIndex, newIndex),
        });
    };

    // Event handler that opens the editing modal
    handleOpenModal = (e) => {
        e.preventDefault()
        this.setState({ modalOpen: true, })
    }

    // Event handler that closes the editing modal and clears the inputs
    handleCloseModal = (e) => this.setState({ modalOpen: false, inputText: null, textareabody: "" })

    // Event handler that shows either a TextArea or an input for images
    // depending on what button is clicked in the editing modal
    showInput = (e) => {
        e.preventDefault()
        this.setState({ inputText: e.target.value })
        console.log(e.target.value)
    }

    // Event handler that triggers when a grid item is edited. The editing modal opens
    // and loads the text in teh appropriate inputs
    handleEditSection = (e, v) => {
        e.preventDefault()
        this.setState({ modalOpen: true, inputText: "text", textareabody: v.body })
        console.log(v)
    }

    // Event handler that manages the changing of the textarea in the editing modal
    handleEditBody = (e) => this.setState({ textareabody: e.target.value })

    // Event handler that is called when save is clicked in the editing modal.
    // A POST fetch call is made to submit the new item to the DB
    submitForm = (e) => {
        this.setState({ loadingForm: true, submitSuccess: false})
        e.preventDefault()
        fetch(`http://rest.learncode.academy/api/bloom/sections`, {
            method: 'post',
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({
                body: this.state.textareabody,
                storyid: "590aaa2a68f75b01005ad675"
            })
        })
            .then(resp => resp.json())
            .then(data => {
                this.setState({ loadingForm: false, submitSuccess: true})
            })

    }

    render() {
        let inputText = this.state.inputText;
        // Renders a Next button depending the length of sections within the story
        // a single story has exist before it could be rendered.
        let nextbutton = null
        if (this.state.timelineitems.length > 0) {
            nextbutton = <Button color='green'>Next <Icon name='long arrow right' /></Button>
        }
        return (
            <Container fluid id="editcontainer">
                <Container>
                    <Segment basic textAlign='right'>
                        <Button>See Demo</Button>
                        {nextbutton}
                    </Segment>
                    <Segment padded='very' basic>
                        <Input id='timeline-title' fluid
                            placeholder='Title'
                            onChange={this.handleTimelineTitleChange}
                        />
                    </Segment>
                    <Segment padded='very' basic className='section-grid-container'>
                        <Dimmer active={this.state.loadingSections} inverted>
                            <Loader inverted content='Loading Sections'/>
                        </Dimmer>
                        <Modal
                            trigger={
                                <SortableList items={this.state.timelineitems}
                                    onSortEnd={this.onSortEnd}
                                    axis='xy'
                                    helperClass='section-grid-item-wrapper'
                                    handleAddSectionButton={this.handleOpenModal}
                                    handleEditSection={this.handleEditSection}
                                    pressDelay={200}
                                />
                            }
                            open={this.state.modalOpen}
                            onClose={this.handleCloseModal}
                            // makes it so that you cant close modal by clicking background
                            closeOnEscape={true}
                            closeOnRootNodeClick={false}
                            size='large'
                        >
                            <Modal.Header as='h3'> <Icon name='plus square outline' />Add Section</Modal.Header>
                            <Modal.Content>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column as={Menu} icon vertical tabular className='input-menu'>
                                            <Menu.Item>
                                                <Button icon='picture' primary onClick={event => this.showInput(event)} value='picture' />
                                            </Menu.Item>
                                            <Menu.Item>
                                                <Button icon='font' onClick={event => this.showInput(event)} value='text' />
                                            </Menu.Item>
                                        </Grid.Column>
                                        <Grid.Column as={Segment} basic width='14'>
                                            {!inputText &&
                                                <Header as='h1' textAlign='center' className='first-prompt-message'>
                                                    <Icon name='long arrow left' size='huge' />
                                                    Select a type of input first
                                                </Header>
                                            }
                                            <Segment basic className='input-container'>
                                                {inputText && (
                                                    inputText === "picture" ? (
                                                        <Form>
                                                            <Form.Field>
                                                                <Form.Input as='input' type='file' accept='image/*' control={Input}/>
                                                            </Form.Field>
                                                            <Form.Input type='text' placeholder='Optional Caption / Description' />
                                                        </Form>
                                                    ) : (
                                                        <Form loading={this.state.loadingForm} warning={this.state.submitSuccess}>
                                                            <TextArea value={this.state.textareabody} onChange={event => this.handleEditBody(event)} placeholder='Tell us your story' />
                                                            <Message warning>Ayyye its up</Message>
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
                                <Button color='red' onClick={this.handleCloseModal} inverted className='cancel-button'>
                                    <Icon name='long arrow left' /> Exit
                                </Button>
                                <Button color='green' onClick={this.submitForm} inverted>
                                    <Icon name='save' /> Save
                                </Button>
                            </Modal.Actions>
                        </Modal>
                    </Segment>
                </Container>
            </Container>
        )
    }
}


const SortableItem = SortableElement(({ value, handleEditSection }) => {
    return (
        <div className='section-grid-item-container'>
            <div className='menu-icons'>
                <Icon name='content' className='reorder-icon' size='large' />
                <div className='menu-icons-right'>
                    <Icon name='pencil' className='edit-icon' color='blue' size='large' onClick={(event) => handleEditSection(event, value)} />
                    <Icon name='trash outline' className='trash-icon' size='large' color='red' />
                </div>
            </div>
            <Card className='section-grid-item-content'>
                <Card.Content description={value.body} />
            </Card>
        </div>
    )
});

const SortableList = SortableContainer(({ items, handleAddSectionButton, handleEditSection }) => {
    return (
        <div className='section-grid'>
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value} handleEditSection={handleEditSection} />

            ))}
            <div className='section-grid-item-container section-grid-item-add' onClick={handleAddSectionButton}>
                <Icon name='plus square outline' size='massive'></Icon>
            </div>
        </div>
    );
});

export default Edit
