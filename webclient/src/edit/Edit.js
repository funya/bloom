import React, { Component } from 'react';
import { Container, Segment, Icon, Header, Input, Message, Image, Button, Loader, Dimmer, Modal, Menu, Popup, Label, Grid, TextArea, Form, Card } from 'semantic-ui-react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

class Edit extends Component {

    render() {
        let inputText = this.props.inputText;
        // Renders a Next button depending the length of sections within the story
        // a single story has exist before it could be rendered.
        let nextbutton = null
        if (this.props.timelineitems.length > 0) {
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
                            onChange={this.props.handleTimelineTitleChange}
                        />
                    </Segment>
                    <Segment padded='very' basic className='section-grid-container'>
                        <Dimmer active={this.props.loadingSections} inverted>
                            <Loader inverted content='Loading Sections' />
                        </Dimmer>
                        <Modal
                            trigger={
                                <SortableList
                                    items={this.props.timelineitems}
                                    onSortEnd={this.props.onSortEnd}
                                    axis='xy'
                                    helperClass='section-grid-item-wrapper'
                                    handleAddSectionButton={this.props.handleOpenModal}
                                    handleEditSection={this.props.handleEditSection}
                                    showDeleteModal={this.props.showDeleteModal}
                                    pressDelay={200}
                                />
                            }
                            open={this.props.modalOpen}
                            onClose={this.props.handleCloseModal}
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
                                                <Button icon='picture' primary onClick={event => this.props.showInput(event)} value='picture' />
                                            </Menu.Item>
                                            <Menu.Item>
                                                <Button icon='font' onClick={event => this.props.showInput(event)} value='text' />
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
                                                                <Form.Input as='input' type='file' accept='image/*' />
                                                            </Form.Field>
                                                            <Form.Input type='text' placeholder='Optional Caption / Description' />
                                                        </Form>
                                                    ) : (
                                                            <Form loading={this.props.loadingForm} warning={this.props.submitSuccess}>
                                                                <TextArea value={this.props.textareabody} onChange={event => this.props.handleEditBody(event)} placeholder='Tell us your story' />
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
                                <Button color='red' onClick={this.props.handleCloseModal} inverted className='cancel-button'>
                                    <Icon name='long arrow left' /> Exit
                                </Button>
                                <Button color='green' onClick={this.props.submitForm} inverted>
                                    <Icon name='save' /> Save
                                </Button>
                            </Modal.Actions>
                        </Modal>
                    </Segment>
                </Container>
                <Modal open={this.props.deleteModalOpen} onClose={this.props.closeDeleteModal} basic>
                    <Modal.Header as='h3'> <Icon name='warning' color='red'/>Delete Section</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to delete this section? Once it's deleted, it will be gone <strong>forever</strong>.</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button basic color='green' inverted onClick={this.props.closeDeleteModal}>
                            <Icon name='long arrow left' /> Cancel
                        </Button>
                        <Button color='red' inverted onClick={this.props.handleDeleteSection}>
                            <Icon name='trash outline' /> Delete
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Container>
        )
    }
}


const SortableItem = SortableElement(({ value, handleEditSection, showDeleteModal }) => {
    return (
        <div className='section-grid-item-container'>
            <div className='menu-icons'>
                <Icon name='content' className='reorder-icon' size='large' />
                <div className='menu-icons-right'>
                    <Icon name='pencil' className='edit-icon' color='blue' size='large' onClick={(event) => handleEditSection(event, value)} />
                    <Icon name='trash outline' className='trash-icon' size='large' color='red' onClick={showDeleteModal(value.id)} />
                </div>
            </div>
            <Card className='section-grid-item-content'>
                <Card.Content description={value.body} />
            </Card>
        </div>
    )
});

const SortableList = SortableContainer(({ items, handleAddSectionButton, handleEditSection, showDeleteModal }) => {
    return (
        <div className='section-grid'>
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value} handleEditSection={handleEditSection} showDeleteModal={showDeleteModal} />

            ))}
            <div className='section-grid-item-container section-grid-item-add' onClick={handleAddSectionButton}>
                <Icon name='plus square outline' size='massive'></Icon>
            </div>
        </div>
    );
});

export default Edit
