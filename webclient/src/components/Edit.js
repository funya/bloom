import React, { Component } from 'react';
import { Container, Grid, Menu, Sidebar, Segment, Image, Icon, Header, Input, Message, Modal } from 'semantic-ui-react'
import Vivus from "vivus";

import EditTimeline from '../components/EditTimeline'
import image from '../img/image.png'
import lotuspath from '../img/lotus.svg'
import exampletlitems from '../reducers/exampleedit.json'

import './edit.css';

let nextid = 0

class Edit extends Component {
    constructor(props) {
        super(props);

        //track two mutable state properties:
        // titleVisibleInput = a boolean to keep track of focus of input bar
        // title = the title of the timeline
        // timeline = containers the timeline sections
        this.state = {
            titleVisibleInput: true,
            title: "",
            timelineitems: []
        };
    }


    componentDidMount() {
        document.title = "Bloom | Edit";
        new Vivus('lotus', { duration: 1000, file: lotuspath, type: 'oneByOne' })
    }

    handleTitleInputFocus = () => this.setState({ titleVisibleInput: !this.state.titleVisibleInput })

    handleTimelineTitleChange = (event) => this.setState({ title: event.target.value })

    handleAddSectionButton = () => {


        let t = {
            body: "",
            id: nextid++,
        }
        let ti = this.state.timelineitems.slice()
        ti.push(t)
        this.setState({timelineitems: ti})
        console.log(this.state.timelineitems)
    }

    render() {
        return (
            <div>
                <Segment className='no-border'><Message id='editmessage' attached color='teal'>You are now in edit mode</Message></Segment>
                
                <Container fluid id='editcontainer'>
                    <Container textAlign='right'>
                        <Menu compact icon='labeled' borderless id='submenu'>
                            <Menu.Item name='plus' onClick={this.handleAddSectionButton}>
                                <Icon circular inverted name='plus' color='blue' />
                                Add Section
                            </Menu.Item>
                            <Menu.Item name='ordered list'>
                                <Icon circular inverted name='ordered list' color='blue' onClick={this.handleReorder}/>
                                Reorder
                            </Menu.Item>
                            <Menu.Item name='save'>
                                <Icon circular inverted name='save' color='blue'/>
                                Save
                            </Menu.Item>
                            <Menu.Item name='eye'>
                                <Icon circular inverted name='eye' color='blue'/>
                                Preview
                            </Menu.Item>
                            <Menu.Item name='send'>
                                <Icon circular inverted name='send' color='blue'/>
                                Submit
                            </Menu.Item>
                        </Menu>
                    </Container>
                    <Container> {/* timeline title */}
                        <Segment textAlign='center' padded basic>
                            <div id='lotus'></div>
                            <Input id='timeline-title' size='small' placeholder='Title' value={this.state.title} onChange={event => this.handleTimelineTitleChange(event)} onFocus={this.handleTitleInputFocus} onBlur={this.handleTitleInputFocus} transparent={this.state.titleVisibleInput} />
                        </Segment>
                    </Container>
                    <Container > {/* timeline sections */}
                            <EditTimeline timelineitems={this.state.timelineitems} onTimelineItemClick={this.handleTimelineItemClick}>
                            </EditTimeline>
                    </Container>
                </Container>
            </div>
        )
    }
}

export default Edit
