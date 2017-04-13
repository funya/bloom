import React, { Component } from 'react';
import { Container, Grid, Menu, Sidebar, Segment, Button, Icon, Header, Form, Rail } from 'semantic-ui-react'

import VisibleTimeline from '../containers/VisibleTimeline'


class Edit extends Component {
    state = { rightSidebarVisible: false }

    componentDidMount() {
        document.title = "Bloom | Edit";
    }

    showAddSectionWindow = () => this.setState({ rightSidebarVisible: !this.state.rightSidebarVisible })

    render() {
        const { rightSidebarVisible } = this.state
        return (
            <Sidebar.Pushable as={Segment} className='main-edit-container'>
                <Rail attached position='left'>
                            <Icon name='close' />
                        </Rail>
                <Sidebar as={Grid} animation='overlay'
                    direction='right' visible={rightSidebarVisible}
                    id='addform'>
                        <Container as='Segment' padded>
                            <Header size='large' textAlign='center'>Add New Section</Header>
                            <Form>

                            </Form>
                        </Container>
                </Sidebar>
                <Sidebar.Pusher> 
                    <Grid className='main-edit-container'>
                        <Grid.Column as={Menu} width={3} 
                        id='leftSidebar' className='no-border'
                        vertical fixed='left' borderless>
                            <Menu.Header>
                                EDIT
                            </Menu.Header>
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
                        </Grid.Column>
                        <Grid.Column width={13} className='main-edit-container'>
                            <Segment as={Container} padded fluid className='no-border'>

                                <Container fluid>
                                    <VisibleTimeline />
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