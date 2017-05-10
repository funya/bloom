import React, { Component } from 'react';
import { Item, Button, Icon, Label } from 'semantic-ui-react'
import moment from "moment";
import { Link } from 'react-router-dom';

class StoryItem extends Component {
    
    render() {
        let { createdAt } = this.props
        return (
            <Item>
                <Item.Content>
                    <Item.Header as='h3'>{this.props.name}</Item.Header>
                    <Item.Meta>
                        <span>ID: {this.props.id}</span>
                    </Item.Meta>
                    <Item.Description>{this.props.description}</Item.Description>
                    <Item.Extra>
                        <Link className='ui button edit-story-button' to={{ pathname: `/story/${this.props.id}/edit`, state: this.props}}>
                            Edit story
                            <Icon name='chevron right'/>
                        </Link>
                        <Button className='delete-story-button' color='red' icon='delete' labelPosition='right' content="Delete" />
                        <Label icon='calendar' content={moment(createdAt).format("YYYY-MM-DD")} />
                        <Label icon='unlock' content={this.props.private.toString()}/>
                    </Item.Extra>
                </Item.Content>
            </Item>
        )
    }
}

export default StoryItem