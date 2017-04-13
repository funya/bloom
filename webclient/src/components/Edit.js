import React, { Component } from 'react';
import { Container, Grid, Menu, Sidebar, Segment, Button, Icon } from 'semantic-ui-react'

import VisibleTimeline from '../containers/VisibleTimeline'


class Edit extends Component {
    state = { visible: true }
    componentDidMount() {
        document.title = "Bloom | Edit";
    }

    toggleSidebar = () => this.setState({ visible: !this.state.visible })

    render() {
        const { visible } = this.state
        return (
            <Container fluid={true}>
                <Sidebar.Pushable as={Segment} id='main-edit-container'>
                    <Sidebar as={Menu} animation='overlay' visible={visible} width='wide' vertical>
                        <Menu.Item name='add-section'>
                            <Icon name='add '/>
                            Add Section
                        </Menu.Item>
                        <Menu.Item>
                            <Icon name='trash outline'/>
                            Delete Section
                        </Menu.Item>
                        <Menu.Item >
                            <Icon name='edit'/>
                            Edit Section
                        </Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher>
                        <Segment as={Container} padded fluid>
                            <Container textAlign='right'>
                                <Button basic compact onClick={this.toggleSidebar}>Toggle Sidebar</Button>
                                <Button basic compact>Toggle Timeline View</Button>
                            </Container>
                            <Container fluid>
                                <VisibleTimeline />
                            </Container>
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </Container>
        )
    }
}

export default Edit