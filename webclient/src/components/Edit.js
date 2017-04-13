import React, { Component } from 'react';
import { Container, Grid, Menu, Sidebar, Segment, Button, Icon, Header, Form, Rail } from 'semantic-ui-react'

import VisibleTimeline from '../containers/VisibleTimeline'


class LeftSidebar extends Component {
    
    
    render() {
        return (
            <Menu vertical secondary text>
                <Menu.Item header>EDIT</Menu.Item>
                <Menu.Item name='add-section' onClick={this.showAddSectionWindow}>
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
            </Menu>
        )
    }
}

class RightSidebar extends Component {
    render() {
        return (
            <Container>
                <Header size='large' textAlign='center'>Add New Section</Header>
                <Form>

                </Form>
            </Container>
        )
    }
}

class Edit extends Component {
    state = { 
        selectedtimelineitem: {},
        timeline: {
            author: "",
            title: "",
            ispublic: false,
            timelineitems: []
        }
    }
    
    componentDidMount() {
        document.title = "Bloom | Edit";
    }

    showAddSectionWindow = () => {

    }

    render() {
        return (
            <Sidebar.Pushable as={Segment} className='main-edit-container'>
                <Sidebar>
                    <RightSidebar />
                </Sidebar>
                <Sidebar.Pusher>
                    <Grid>
                        <Grid.Column width={3}>
                            <LeftSidebar />
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <VisibleTimeline />
                        </Grid.Column>
                    </Grid>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        )
    }
}

export default Edit