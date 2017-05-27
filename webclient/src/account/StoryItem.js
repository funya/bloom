import React, { Component } from 'react';
import { Button, Icon, Label, Checkbox, Segment, Header, Container, Popup } from 'semantic-ui-react'
import moment from "moment";
import { Link } from 'react-router-dom';
import DeleteStoryModal from './DeleteStoryModal';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { togglePrivacy } from '../redux/actions';

class StoryItem extends Component {

    toggle = (e) => {
        e.preventDefault()
        const story = { ...this.props }
        this.props.togglePrivacy(!story.private, story)
    }

    render() {
        let { name, id, description, createdAt, togglePrivacy } = this.props
        return (
            <Segment className='story-item' padded='extra'>
                <Checkbox toggle label="Privacy Type" onChange={this.toggle} checked={this.props.private} className='story-toggle' />
                <span className='story-privacy-string'>{
                    this.props.private ? " PRIVATE" : " PUBLIC"
                }</span>
                <Popup
                    trigger={
                        <Icon name='ellipsis vertical' style={{ float: "right", fontSize: "16px", cursor:"pointer" }} />
                    }
                    on='click'
                    basic
                    hideOnScroll
                    style={{zIndex: 900}}
                    position='left'
                    >
                    <DeleteStoryModal storyid={id} />
                </Popup>
                <Header as='h1' className='story-name'>{name}</Header>
                <Container>
                    <div className='story-description'>{description}</div>
                    <div className='story-buttons'>
                        <div className='story-date'><span style={{ color: "rgb(141, 149, 157)" }}>Created On</span> {moment(createdAt).format("LLL")}</div>
                        <Link className='ui button edit-story-button' to={`/story/${id}/edit`}>
                            <Icon name='pencil' />
                            Edit
                            </Link>
                        <div style={{ clear: "both" }}></div>
                    </div>
                </Container>
            </Segment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentStory: state.currentStory
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        togglePrivacy,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryItem)