import React, { Component } from 'react';
import { Container, Segment, Icon, Input, Button, Loader, Dimmer, Modal, Card } from 'semantic-ui-react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import AddSectionButton from './AddSectionButton'

class Edit extends Component {

    render() {
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
                        <SortableList
                            items={this.props.timelineitems}
                            onSortEnd={this.props.onSortEnd}
                            axis='xy'
                            helperClass='section-grid-item-wrapper'
                            storyid={this.props.story.id}
                            fetchSections={this.props.fetchSections}
                            pressDelay={200}
                        />
                    </Segment>
                </Container>
                <Modal open={this.props.deleteModalOpen} onClose={this.props.closeDeleteModal} basic>
                    <Modal.Header as='h3'> <Icon name='warning' color='red' />Delete Section</Modal.Header>
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

const SortableItem = SortableElement(({ value }) => {
    return (
        <div className='section-grid-item-container'>
            <div className='menu-icons'>
                <Icon name='content' className='reorder-icon' size='large' />
                <div className='menu-icons-right'>
                    <Icon name='pencil' className='edit-icon' color='blue' size='large' />
                    <Icon name='trash outline' className='trash-icon' size='large' color='red' />
                </div>
            </div>
            <Card className='section-grid-item-content'>
                <Card.Content description={value.body} />
            </Card>
        </div>
    )
});

const SortableList = SortableContainer(({ items, storyid, fetchSections }) => {
    return (
        <div className='section-grid'>
            {items.map((value, index) => (
                <SortableItem
                    key={`item-${index}`}
                    index={index} value={value}
                />
            ))}
            <AddSectionButton storyid={storyid} fetchSections={fetchSections}/>
        </div>
    );
});

export default Edit
