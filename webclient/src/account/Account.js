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
                                    <Header as='h3' textAlign='center'>Telling your story is not easy. We are here to help. Here are some suggestions to guide you.</Header>
                                    <ol>
                                        <li>Start with facts.</li>
                                        <li>Add thoughts and feelings.</li>
                                        <li>Dig deeper.</li>
                                    </ol>
                                    <Header as='h3' textAlign='center'>Onboarding screen about how to write a story</Header>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, doloremque, totam. Delectus, voluptates similique ducimus! Inventore impedit a quasi consequatur, quam totam distinctio earum ipsam assumenda, animi, nobis placeat, quas.</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates laboriosam voluptatem perspiciatis dolorem ratione consequuntur obcaecati est, facere, voluptatum culpa sed. Molestias explicabo aspernatur corporis quo consequatur, autem numquam, ipsum.</p>
                                    <Header as='h3' textAlign='center'>Story Information</Header>
                                    <Segment>
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
