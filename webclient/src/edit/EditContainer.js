import React, { Component } from 'react';
import { Container, Segment, Icon, Input, Button, Loader, Dimmer, Modal, Card } from 'semantic-ui-react';
import { arrayMove } from 'react-sortable-hoc';
import './edit.css';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import AddSectionButton from './AddSectionButton';
import EditableSectionItem from './EditableSectionItem';
import { Link } from 'react-router-dom';
import { isEqual } from 'lodash';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSections, getMyStories, setCurrentStory } from '../redux/actions';


class EditContainer extends Component {

    // Initialization of DOM nodes goes here. When the edit page is mounted, a fetch 
    // call is made to get the sections of the story. 
    componentDidMount() {
        let storyid = this.props.match.params.id

        this.props.setCurrentStory(storyid)
        this.props.getSections(storyid)

    }

    // Event handler that manages the changing of the story title
    handleTimelineTitleChange = (event) => this.setState({ title: event.target.value })


    // Callback called when resorting of section ends
    onSortEnd = ({ oldIndex, newIndex }) => {
        let items = this.props.sections[this.props.currentStory.id]
        console.log(items)
        let itemsnew = arrayMove(items, oldIndex, newIndex)
        itemsnew.map((ele, index) => {
            ele.index = index
        })
        console.log(itemsnew)
        //MAKE THIS items move store in the DB by making fetch call
    };

    render() {
        const { fetching, fetchError, currentStory, sections } = this.props

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
            <EditableSectionItem value={value} />
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
            setCurrentStory
        }, dispatch)
    }

    export default connect(mapStateToProps, mapDispatchToProps)(EditContainer)