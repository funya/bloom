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
                                            showDeleteModal={this.props.showDeleteModal}
                                        />
                                    )}
                                </Item.Group>
                            </Segment>
                        </Segment>
                    </Segment>
                    <Segment basic padded>
                        <Segment>
                            <Header as='h1' textAlign='center'>Add New Story</Header>
                            <Header as='h3' textAlign='center'>Telling your story is not easy. We are here to help. Here are some suggestions to guide you.</Header>
                            <ol>
                                <li>Start with facts.</li>
                                <li>Add thoughts and feelings.</li>
                                <li>Dig deeper.</li>
                            </ol>
                            <Button onClick={this.props.showmodal('inverted')} id='add-story-button'>Ready to tell your story?</Button>
                            <Modal dimmer={this.props.dimmer} open={this.props.openModal} onClose={this.props.closemodal}>
                                <Modal.Header as='h1'>Add New Story</Modal.Header>
                                <Modal.Content>
                                    <Modal.Description>
                                        <Header>Onboarding screen about how to write a story</Header>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, doloremque, totam. Delectus, voluptates similique ducimus! Inventore impedit a quasi consequatur, quam totam distinctio earum ipsam assumenda, animi, nobis placeat, quas.</p>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates laboriosam voluptatem perspiciatis dolorem ratione consequuntur obcaecati est, facere, voluptatum culpa sed. Molestias explicabo aspernatur corporis quo consequatur, autem numquam, ipsum.</p>
                                        <Header>Story Information</Header>
                                        <Segment>
                                            <Form loading={this.props.loadingForm}>
                                                <Form.Input type='text' placeholder='Name' />
                                                <Form.Input type='text' placeholder='Description (Optional)' />
                                            </Form>
                                        </Segment>
                                    </Modal.Description>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button color='red' onClick={this.props.closemodal}>
                                        Cancel
                                    </Button>
                                    <Button positive icon='checkmark' labelPosition='right' content="Create" onClick={this.close} />
                                </Modal.Actions>
                            </Modal>
                        </Segment>
                    </Segment>
                </Container>
                 <Modal open={this.props.deleteModalOpen} onClose={this.props.closeDeleteModal} basic>
                    <Modal.Header as='h3'> <Icon name='warning' color='red'/>Delete Story</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to delete this story? Once it's deleted, <strong>all</strong> the content contained within this story, including all the text and pictures will be gone <strong>forever</strong>.</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button basic color='green' inverted onClick={this.props.closeDeleteModal}>
                            <Icon name='long arrow left' /> Cancel
                        </Button>
                        <Button color='red' inverted onClick={this.props.handleDeleteStory}>
                            <Icon name='trash outline' /> Delete
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Container>
        )
    }
}

export default Account