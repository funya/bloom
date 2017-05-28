import React, { Component } from 'react';
import { Container, Segment, Header, Icon, Button, Dimmer, Loader, Divider } from 'semantic-ui-react'
import StoryItem from './StoryItem';
import AddStoryModal from './AddStoryModal';

class Account extends Component {
    render() {
        const { currentUser, myStories, fetching } = this.props
        return (
            <Container fluid id='accountcontainer'>
                <Container>
                    <Segment basic padded>
                        <Segment padded>
                            <Header as='h1' icon textAlign='center' id="user-info">
                                <Icon name='user outline' color='grey' circular />
                                <Header.Content>{currentUser.userName}</Header.Content>
                                <Header.Subheader>{currentUser.email}</Header.Subheader>
                            </Header>
                        </Segment>
                    </Segment>
                    <Segment basic>
                        <Divider horizontal><Header as='h1' className='story-container-header'>My Stories</Header></Divider>
                    </Segment>
                    <Segment basic padded className='story-container'>
                        <Dimmer active={fetching.count !== 0} inverted>
                            <Loader content='Retrieving personal stories' />
                        </Dimmer>
                        {myStories.map(story =>
                            <StoryItem
                                {...story}
                                key={story.id}
                                />
                        )}
                    </Segment>
                    <Segment basic padded>
                        <AddStoryModal />
                    </Segment>
                </Container>
            </Container>
        )
    }
}

export default Account
