import React, { Component } from 'react';
import { Container, Segment, Icon, Input, Button, Loader, Dimmer, Modal, Card, Header, Popup } from 'semantic-ui-react';
import { arrayMove } from 'react-sortable-hoc';
import './edit.css';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import AddSectionButton from './AddSectionButton';
import EditableSectionItem from './EditableSectionItem';
import  ScrollToTop from '../components/ScrollToTop';
import { Link } from 'react-router-dom';
import { isEqual } from 'lodash';
import HelpModal from './HelpModal';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSections, getMyStories, setCurrentStory, arrangeSections, setGridWidth, updateTitle, updateDescription } from '../redux/actions';


class EditContainer extends Component {
    state = {
        title: "",
        description: "",
        disabledTitle: true,
        disabledDescription: true,
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

    handleDescription = (e) => this.setState({ description: e.target.value })

    handleTitleDisable = (e) => this.setState({ disabledTitle: false })

    handleDescriptionDisable = (e) => this.setState({ disabledDescription: false })

    updateTitle = (e) => {
        e.preventDefault()
        this.props.updateTitle(this, this.state.title)
    }

    updateDescription = (e) => {
        e.preventDefault()
        this.props.updateDescription(this, this.state.description)
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
        const { description, title, disabledDescription, disabledTitle } = this.state

        let items = sections[currentStory.id]

        // Renders a Next button depending the length of sections within the story
        // a single story has exist before it could be rendered.
        let nextbutton = null
        items !== undefined && (
            items.length > 0 && (
                nextbutton = <Link className='ui button preview-story-button' to={`/story/${currentStory.id}/preview`}>
                    Preview
                <Icon name='long arrow right' />
                </Link>
            )
        )
        return (
            <Container fluid id="editcontainer">
                <ScrollToTop />
                <Container>
                    <Segment basic padded='very' className='button-container'>
                        <HelpModal />
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

                    <div className='story-input-container'>
                        <div className='little-label'>Story Title <Icon name='pencil' color='blue' /></div>
                        <Segment padded='very' basic className='story-input'>
                            <Input id='timeline-title' fluid
                                loading={fetching.count !== 0}
                                placeholder='Blank Title'
                                onChange={this.handleTitle}
                                value={title}
                                transparent={disabledTitle}
                                onClick={this.handleTitleDisable}
                                onBlur={this.updateTitle}
                            />
                        </Segment>
                    </div>

                    <div className='story-input-container'>
                        <div className='little-label'>Story Description <Icon name='pencil' color='blue' /></div>
                        <Segment padded='very' basic className='story-input'>
                            <Input id='timeline-description' fluid
                                placeholder='Blank Description'
                                loading={fetching.count !== 0}
                                onChange={this.handleDescription}
                                value={description}
                                transparent={disabledDescription}
                                onClick={this.handleDescriptionDisable}
                                onBlur={this.updateDescription}
                            />
                        </Segment>
                    </div>

                    <Dimmer.Dimmable as={Segment} blurring dimmed={fetching.count !== 0} padded='very' basic className='section-grid-container'>
                        <Dimmer active={fetching.count !== 0 && (fetching.fetch.includes("sections") || fetching.fetch.includes("section"))} inverted style={{ backgroundColor: "rgba(0,0,0,0)" }}>
                            <Loader inverted content='Loading' />
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
                    </Dimmer.Dimmable>

                </Container>
            </Container>
        )
    }
}

const SortableItem = SortableElement(({ value }) => {
    return (
        <EditableSectionItem section={{ ...value }} />
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
        setGridWidth,
        updateTitle,
        updateDescription
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContainer)