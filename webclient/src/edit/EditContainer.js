import React, { Component } from 'react';
import { Container, Segment, Icon, Input, Button, Loader, Dimmer, Modal, Card, Header, Popup } from 'semantic-ui-react';
import { arrayMove } from 'react-sortable-hoc';
import './edit.css';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import AddSectionButton from './AddSectionButton';
import EditableSectionItem from './EditableSectionItem';
import { Link } from 'react-router-dom';
import { isEqual } from 'lodash';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSections, getMyStories, setCurrentStory, arrangeSections, setGridWidth } from '../redux/actions';


class EditContainer extends Component {
    state = {
        title: "",
        description: "",
        disabled: true,
        width: "317px"
    }


    // Initialization of DOM nodes goes here. When the edit page is mounted, a fetch 
    // call is made to get the sections of the story. 
    componentDidMount() {
        let storyid = this.props.match.params.id

        this.props.setCurrentStory(this, storyid)
        this.props.getSections(storyid)

    }

    // Event handler that manages the changing of the story title
    handleTitle = (e) => this.setState({ title: e.target.value })

    handleTitleDisable = (e) => this.setState({ disabled: false })

    updateTitle = (e) => {
        this.setState({ disabled: true })
    }

    // Callback called when resorting of section ends
    onSortEnd = ({ oldIndex, newIndex }) => {
        let items = this.props.sections[this.props.currentStory.id]
        let itemsnew = arrayMove(items, oldIndex, newIndex)
        itemsnew.map((ele, index) => {
            ele.index = index
        })
        this.props.arrangeSections(itemsnew, oldIndex, newIndex)
    };

    render() {
        const { fetching, fetchError, currentStory, sections, setGridWidth } = this.props
        const { description, title, disabled } = this.state

        let items = sections[currentStory.id]

        // Renders a Next button depending the length of sections within the story
        // a single story has exist before it could be rendered.
        let nextbutton = null
        items !== undefined && (
            items.length > 0 && (
                nextbutton = <Link className='ui button preview-story-button' to={`/story/${currentStory.id}/preview`}>
                    Next
                <Icon name='long arrow right' />
                </Link>
            )
        )
        return (
            <Container fluid id="editcontainer">
                <Container>

                    <Segment basic padded='very' className='button-container'>
                        <Button color='blue'>See Demo</Button>
                        <Popup
                            trigger={<Button icon='grid layout' onClick={setGridWidth} value={"317px"} />}
                            content='Grid Layout'
                            position={'bottom center'}
                            basic
                            inverted
                            />
                        <Popup
                            trigger={<Button icon='list layout' onClick={setGridWidth} value={"100%"} />}
                            content='List Layout'
                            position={'bottom center'}
                            basic
                            inverted
                            />
                        {nextbutton}
                        <div style={{ clear: "both" }}></div>
                    </Segment>

                    <Segment padded='very' basic>
                        <Input id='timeline-title' fluid
                            placeholder='Title'
                            onChange={this.handleTitle}
                            value={title}
                            transparent={disabled}
                            onClick={this.handleTitleDisable}
                            onBlur={this.updateTitle}
                            />
                    </Segment>

                    <Segment padded='very' basic className='section-grid-container'>
                        <Dimmer active={fetching.count !== 0} inverted>
                            <Loader inverted content='Loading Sections' />
                        </Dimmer>
                        {items !== undefined && (
                            <SortableList
                                items={items}
                                onSortEnd={this.onSortEnd}
                                axis='xy'
                                helperClass='section-grid-item-wrapper'
                                pressDelay={200}
                                />
                        )
                        }
                    </Segment>

                </Container>
            </Container>
        )
    }
}

const SortableItem = SortableElement(({ value }) => {
    return (
        <EditableSectionItem section={{...value}} />
        )
    });

const SortableList = SortableContainer(({ items }) => {
    return (
        <div className='section-grid'>
            {items.map((value, index) => (
                <SortableItem
                    key={`item-${index}`}
                    index={index} value={value}
                    />
            ))}
            <AddSectionButton />
        </div>
    );
});

const mapStateToProps = (state) => {
    return {
        fetching: state.fetching,
        fetchError: state.fetchError,
        sections: state.sections,
        currentStory: state.currentStory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getSections,
        getMyStories,
        setCurrentStory,
        arrangeSections,
        setGridWidth
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContainer)