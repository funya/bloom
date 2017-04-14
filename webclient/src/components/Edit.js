import React, { Component } from 'react';
import { Container, Grid, Menu, Sidebar, Segment, Image, Button, Icon, Header, Form, TextArea, Input } from 'semantic-ui-react'

import VisibleTimelineContainer from '../containers/VisibleTimelineContainer'
import AddFormContainer from '../containers/AddFormContainer'
import image from '../img/image.png'

class Edit extends Component {
    state = {
        visibleRightSidebar: false
    }

    componentDidMount() {
        document.title = "Bloom | Edit";
    }

    toggleRightSidebar = () => this.setState({ visibleRightSidebar: !this.state.visibleRightSidebar })

    // handleTimelineItemClick = () => {
    //     this.showAddSectionWindow()

    // }

    //handleAuthorChange = (e) => this.setState(...this.state, time)

    render() {
        return (
            <Sidebar.Pushable as={Segment} className='main-edit-container'>
                <Sidebar as={Grid} animation='overlay'
                    direction='right' visible={this.state.visibleRightSidebar}
                    id='addform'>
                    <Container as='Segment'>
                        <Header size='large' textAlign='center'>Add/Edit Event</Header>
                        <AddFormContainer />
                    </Container>
                </Sidebar>
                <Sidebar.Pusher>
                    <Grid className='main-edit-container'>
                        <Grid.Column as={Menu} width={3}
                            id='leftSidebar' className='no-border'
                            vertical fixed='left' borderless>
                            <Menu.Item header>
                                EDIT
                            </Menu.Item>
                            <Menu.Item name='add-section' onClick={this.toggleRightSidebar}>
                                <Icon name='add' />
                                Add Section
                                </Menu.Item>
                        </Grid.Column>
                        <Grid.Column width={13} className='main-edit-container'>
                            <Segment basic>
                                <Container fluid>
                                    <Container>
                                        <Image src={image} size='small' />
                                        <Input size='small' defaultValue='Timeline Title'/>
                                        <br />
                                        <Input size='small' defaultValue='Timeline Author'/>
                                    </Container>
                                    <Container >
                                        <VisibleTimelineContainer />
                                    </Container>
                                </Container>
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        )
    }
}

export default Edit
