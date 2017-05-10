import React, { Component } from 'react';
import { Container, Segment, Icon, Input, Button, Loader, Dimmer, Modal, Card } from 'semantic-ui-react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import AddSectionButton from './AddSectionButton'
import EditableSectionItem from './EditableSectionItem'
import { Link } from 'react-router-dom';

class Edit extends Component {

    render() {
        // Renders a Next button depending the length of sections within the story
        // a single story has exist before it could be rendered.
        let nextbutton = null
        if (this.props.timelineitems.length > 0) {
            nextbutton = <Link className='ui button preview-story-button' to={{ pathname: `/story/${this.props.story.id}/preview`, state: { id: this.props.story.id, name: this.props.story.name } }}>
                Next
                <Icon name='long arrow right' />
            </Link>
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
            </Container>
        )
    }
}

const SortableItem = SortableElement(({ value, fetchSections }) => {
    return (
        <EditableSectionItem value={value} fetchSections={fetchSections} />
    )
});

const SortableList = SortableContainer(({ items, storyid, fetchSections }) => {
    return (
        <div className='section-grid'>
            {items.map((value, index) => (
                <SortableItem
                    key={`item-${index}`}
                    index={index} value={value}
                    fetchSections={fetchSections}
                />
            ))}
            <AddSectionButton storyid={storyid} fetchSections={fetchSections} />
        </div>
    );
});

export default Edit
