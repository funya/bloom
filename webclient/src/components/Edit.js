import React, { Component } from 'react';
import { Container, Grid, Menu, Sidebar, Segment, Button, Icon, Form, Modal } from 'semantic-ui-react'

import VisibleTimeline from '../containers/VisibleTimeline'


class Edit extends Component {
    state = { leftSidebarVisible: true, rightSidebarVisible: false }

    componentDidMount() {
        document.title = "Bloom | Edit";
    }

    toggleLeftSidebar = () => this.setState({ ...this.state, leftSidebarVisible: !this.state.leftSidebarVisible })

    toggleRightSidebar = () => {
        this.setState({ ...this.state, rightSidebarVisible: !this.state.rightSidebarVisible })

    }


    render() {
        const { leftSidebarVisible, rightSidebarVisible } = this.state
        return (
            <Container fluid={true}>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Segment} animation='overlay' visible={rightSidebarVisible} direction='right' width='very wide' vertical >
                        sdf
                    </Sidebar>
                    <Sidebar.Pusher>
                        <Sidebar.Pushable as={Segment} id='main-edit-container'>
                            <Sidebar as={Menu} animation='push' visible={leftSidebarVisible} width='wide' vertical>
                                <Menu.Item name='add-section' onClick={this.toggleRightSidebar}>
                                    <Icon name='add' />
                                    Add Section
                                </Menu.Item>
                                <Menu.Item>
                                    <Icon name='trash outline' />
                                    Delete Section
                                </Menu.Item>
                                <Menu.Item >
                                    <Icon name='edit' />
                                    Edit Section
                                </Menu.Item>
                            </Sidebar>
                            <Sidebar.Pusher>
                                <Segment as={Container} padded fluid>
                                    <Container textAlign='right'>
                                        <Button basic compact onClick={this.toggleLeftSidebar}>Toggle Sidebar</Button>
                                        <Button basic compact>Toggle Timeline View</Button>
                                    </Container>
                                    <Container fluid>
                                        <VisibleTimeline />
                                    </Container>
                                </Segment>
                            </Sidebar.Pusher>
                        </Sidebar.Pushable>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>

            </Container>
        )
    }
}

export default Edit