import React, { Component } from 'react';
import { Segment, Menu, Button, Header, Grid, Modal, Icon, Form, TextArea, Message, Input, Image } from 'semantic-ui-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createImageSection, createSection } from '../redux/actions';


class AddSectionButton extends Component {
    state = {
        visible: false,
        imageUrl: "",
        text: "",
        inputType: "text",
        image: {},
    }

    showModal = (e) => this.setState({ visible: true })

    hideModal = (e) => this.setState({ visible: false })

    showTextInput = (e) => this.setState({ inputType: "text" })

    showPictureInput = (e) => this.setState({ inputType: "picture" })

    handleTextSection = (e) => this.setState({ text: e.target.value })

    handleImage = (e) => this.setState({ imageUrl: URL.createObjectURL(e.target.files[0]), image: e.target.files[0] })

    submit = (e) => {
        e.preventDefault()
        const { text, image, inputType } = this.state
        if (inputType === "text") {
            this.props.createSection(this, text)
        } else {
            this.props.createImageSection(this, image, text)
        }
    }

    render() {
        const { fetching, fetchError} = this.props
        const { visible, imageUrl, text, inputType } = this.state

        return (
            <Modal
                trigger={
                    <div className='section-grid-item-container section-grid-item-add' onClick={this.showModal}>
                        <Icon name='plus square outline' size='massive'></Icon>
                    </div>
                }
                dimmer="blurring"
                open={visible}
                onClose={this.hideModal}
                closeOnEscape={true}
                closeOnRootNodeClick={false}
            >
                <Modal.Header as='h2' className="modal-header"> <Icon name='plus square outline'/>Add Section</Modal.Header>
                <Modal.Content className='modal-content-container'>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column as={Menu} icon vertical tabular className='input-menu'>
                                <Menu.Item>
                                    {
                                        (inputType === "text") ? (<Button icon='picture' onClick={this.showPictureInput} />) 
                                        : (<Button icon='picture' primary onClick={this.showPictureInput} />)
                                    }
                                </Menu.Item>
                                <Menu.Item>
                                    {
                                        (inputType === "text") ? (<Button icon='font' primary onClick={this.showTextInput} />) 
                                        : (<Button icon='font' onClick={this.showTextInput} />)
                                    }
                                </Menu.Item>
                            </Grid.Column>
                            <Grid.Column as={Segment} basic width='14'>
                                <Segment basic className='input-container'>
                                    {inputType && (
                                        inputType === "picture" ? (
                                            <Form onSubmit={this.submit} loading={fetching.count !== 0} warning={fetchError.length > 0}>
                                                <Form.Field>
                                                    <Image src={imageUrl} />
                                                    <Form.Input as='input' type='file' accept='image/*' onChange={this.handleImage} />
                                                </Form.Field>
                                                <Form.Input type='text' placeholder='Optional Caption / Description' value={text} onChange={this.handleTextSection} />
                                                <Message warning>{fetchError}</Message>
                                            </Form>
                                        ) : (
                                                <Form onSubmit={this.submit} loading={fetching.count !== 0} warning={fetchError.length > 0}>
                                                    <TextArea value={text} onChange={this.handleTextSection} placeholder='Tell your story' />
                                                    <Message warning>{fetchError}</Message>
                                                </Form>
                                            )
                                    )
                                    }
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.hideModal} className='cancel-button'>
                        Cancel
                    </Button>
                    <Button color='green' onClick={this.submit}>
                        <Icon name='save' /> Save
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        fetching: state.fetching,
        fetchError: state.fetchError,

    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        createImageSection,
        createSection
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSectionButton)