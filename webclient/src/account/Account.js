import React, { Component } from 'react';
import { Container, Segment, Header, Icon, Button, Dimmer, Loader, Item, Modal, Form } from 'semantic-ui-react'
import StoryItem from './StoryItem';

class Account extends Component {
    render() {
        return (
            <Container fluid id='accountcontainer'>
                <Container>
                    <Segment basic padded>
                        <Segment secondary>
                            <Header as='h2' icon textAlign='center'>
                                <Icon name='user' circular />
                                <Header.Content>@{this.props.user.userName}</Header.Content>
                                <Header.Subheader>{this.props.user.email}</Header.Subheader>
                            </Header>
                        </Segment>
                    </Segment>
                    <Segment basic padded>
                        <Segment>
                            <Header as='h1' textAlign='center'>Stories</Header>
                            <Segment basic>
                                <Item.Group divided>
                                    <Dimmer active={this.props.loading} inverted>
                                        <Loader content='Retrieving personal stories' />
                                    </Dimmer>
                                    {this.props.stories.map(story =>
                                        <StoryItem
                                            {...story}
                                            key={story.id}
                                            fetchStories={this.props.fetchStories}
                                        />
                                    )}
                                    <Item>
                                        <Button onClick={this.props.showNewModal('inverted')} id='add-story-button'>Add new story</Button>
                                    </Item>
                                </Item.Group>
                            </Segment>
                        </Segment>
                    </Segment>
                    <Segment basic padded>
                        <Modal dimmer={this.props.dimmer} open={this.props.visibleNewModal} onClose={this.props.hideNewModal}>
                            <Modal.Header as='h2'>Add New Story</Modal.Header>
                            <Modal.Content>
                                <Modal.Description>
                                    <Segment basic padded>
                                        <Header as='h3' textAlign='center'>Starting is the hardest part. Here are some suggestions to guide you.</Header>
                                        <ul>
                                            <li>Start with facts. Focus on the facts of what happened. Who, what, when, and where?</li>
                                            <li>Add thoughts and feelings. How did you feel? How do you feel now?</li>
                                            <li>Dig deeper. Add as much detail as you’re comfortable with. </li>
                                        </ul>
                                        <Header as='h4' textAlign='center'>These are only suggestions. This is your story to tell. Thank you for your courageous voice. </Header>
                                    </Segment>
                                    <Segment basic padded>
                                        <Header as='h3' textAlign='center'>Story Information</Header>
                                        <Form loading={this.props.newStoryLoading} onSubmit={event => this.props.submitStory(event)}>
                                            <Form.Input type='text' placeholder='Name' value={this.props.newstoryname} onChange={event => this.props.handleNameInput(event)} />
                                            <Form.Input type='text' placeholder='Description (Optional)' value={this.props.newstorydescription} onChange={event => this.props.handleDescriptionInput(event)} />
                                        </Form>
                                    </Segment>
                                </Modal.Description>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='red' onClick={this.props.hideNewModal}>
                                    Cancel
                                    </Button>
                                <Button positive icon='checkmark' labelPosition='right' content="Create" onClick={this.props.submitStory} />
                            </Modal.Actions>
                        </Modal>
                    </Segment>
                </Container>
            </Container>
        )
    }
}

export default Account
