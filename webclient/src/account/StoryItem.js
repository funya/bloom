import React, { Component } from 'react';
import { Item, Button, Icon, Label, Modal, Checkbox } from 'semantic-ui-react'
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
            <Item className='story-item'>
                <Item.Content>
                    <Item.Header as='h3'>{name}</Item.Header>
                    <Item.Meta>
                        <span>Created: {moment(createdAt).format("LLL")}</span>
                    </Item.Meta>
                    <Item.Description>{description}</Item.Description>
                    <Item.Extra>
                        <div className='story-buttons'>
                            <Link className='ui button edit-story-button' to={`/story/${id}/edit`}>
                                Edit story
                                    <Icon name='chevron right' />
                            </Link>
                            <DeleteStoryModal storyid={id} />
                        </div>
                        <Checkbox toggle label="Private" onChange={this.toggle} checked={this.props.private} />
                    </Item.Extra>
                </Item.Content>
            </Item>
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