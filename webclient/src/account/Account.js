import React, { Component } from 'react';
import { Container, Segment, Header, Icon, Button, Dimmer, Loader, Item, Modal, Form } from 'semantic-ui-react'
import StoryItem from './StoryItem';
import AddStoryModal from './AddStoryModal';

class Account extends Component {
    render() {
        const { currentUser, myStories, fetching } = this.props
        return (
            <Container fluid id='accountcontainer'>
                <Container>
                    <Segment basic padded>
                        <Segment secondary>
                            <Header as='h2' icon textAlign='center'>
                                <Icon name='user' circular />
                                <Header.Content>@{currentUser.userName}</Header.Content>
                                <Header.Subheader>{currentUser.email}</Header.Subheader>
                            </Header>
                        </Segment>
                    </Segment>
                    <Segment basic padded>
                        <Segment>
                            <Header as='h1' textAlign='center'>Stories</Header>
                            <Segment basic>
                                <Item.Group divided>
                                    <Dimmer active={fetching.count !== 0} inverted>
                                        <Loader content='Retrieving personal stories' />
                                    </Dimmer>
                                    {myStories.map(story =>
                                        <StoryItem
                                            {...story}
                                            key={story.id}
                                        />
                                    )}
                                    <Item>
                                        <AddStoryModal />
                                    </Item>
                                </Item.Group>
                            </Segment>
                        </Segment>
                    </Segment>
                </Container>
            </Container>
        )
    }
}

export default Account
