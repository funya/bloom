import React, { Component } from 'react';
import { Segment, Modal, Popup, Icon, Button, Form, Message, Grid, Menu, TextArea, Input, Image } from 'semantic-ui-react';
import { isEqual, reduce } from 'lodash';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { editSection, editImageSection, setCurrentEditSection, handleImage, handleTextSection } from '../redux/actions';

class EditMessageModal extends Component {
    state = {
        visible: false,
    }

    hideModal = (e) => this.setState({ visible: false })

    showModal = (e) => {
        this.setState({ visible: true })
        this.props.setCurrentEditSection(this.props.section)
    }

    handleTextSection = (e) => {
        e.preventDefault()
        this.props.handleTextSection(e.target.value)
    }

    handleImage = (e) => {
        e.preventDefault()
        this.props.handleImage(URL.createObjectURL(e.target.files[0]), e.target.files[0])
    }

    update = (e) => {
        e.preventDefault()
        if (this.props.section.image.length > 0) {
            if (this.props.editSection.image === undefined) {
                this.setState({ visible: false })
            } else {
                this.props.editImageSection(this)
            }
        } else {
            this.props.editSection(this, this.props.editSection.body, this.props.section)
        }
    }


    render() {
        const { visible, } = this.state
        const { fetching, fetchError, section, currentSection } = this.props
        return (
            <Modal
                trigger={
                    <Popup
                        inverted
                        basic
                        trigger={<Icon name='pencil' className='edit-icon' color='blue' size='large' onClick={this.showModal} />}
                        content='Edit Message'
                    />
                }
                dimmer="inverted"
                open={visible}
                onClose={this.hideModal}
                closeOnEscape={true}
                closeOnRootNodeClick={false}
                closeIcon='close'
            >
                <Modal.Header as='h2'> <Icon name='pencil' color='blue' />Edit Section</Modal.Header>
                <Modal.Content>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column as={Menu} icon vertical tabular className='input-menu'>
                                <Menu.Item>
                                    <Button icon='picture' primary disabled={section.image.length <= 0} />
                                </Menu.Item>
                                <Menu.Item>
                                    <Button icon='font' disabled={section.image.length > 0} />
                                </Menu.Item>
                            </Grid.Column>
                            <Grid.Column as={Segment} basic width='14'>
                                <Segment basic className='input-container'>
                                    {
                                        (currentSection.id !== undefined) && (
                                            currentSection.image.length > 0 ? (
                                                <Form onSubmit={this.update} loading={fetching.count !== 0} warning={fetchError.length > 0}>
                                                    <Form.Field>
                                                        {(currentSection.image.length > 0) ? (
                                                            <Image src={currentSection.image} />
                                                        ) : (
                                                                <Image src={currentSection.image} />
                                                            )}
                                                        <input type='file' accept='image/*' onChange={this.handleImage} />
                                                    </Form.Field>
                                                    <Form.Input type='text' placeholder='Optional Caption / Description' value={currentSection.body} onChange={this.handleTextSection} />
                                                </Form>
                                            ) : (
                                                    <Form onSubmit={this.update} loading={fetching.count !== 0} warning={fetchError.length > 0}>
                                                        <TextArea value={currentSection.body} onChange={this.handleTextSection} placeholder='Tell us your story' />
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
                    <Button onClick={this.hideModal} style={{ float: "left" }}>
                        Cancel
                        </Button>
                    <Button inverted color='green' onClick={this.update}>
                        Save Changes
                        <Icon name='long arrow right' />
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
        currentSection: state.currentSection
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        editSection,
        editImageSection,
        setCurrentEditSection,
        handleTextSection,
        handleImage
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMessageModal)
