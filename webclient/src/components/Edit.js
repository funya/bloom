import React, { Component } from 'react';
import { Container, Grid, Menu, Sidebar, Segment, Image, Icon, Header, Input, Message, Modal, Button } from 'semantic-ui-react'
import Vivus from "vivus";
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';


import Timeline from './Timeline'
import EditTimeline from './EditTimeline'
import image from '../img/image.png'
import lotuspath from '../img/lotus.svg'
import exampletlitems from '../reducers/exampleedit.json'

import './edit.css';

let nextid = 0

class Edit extends Component {
    constructor(props) {
        super(props);

        //track three mutable state properties:
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
            id: nextid++,
        }
        let ti = this.state.timelineitems.slice()
        ti.push(t)
        this.setState({ timelineitems: ti })
        console.log(this.state.timelineitems)
    }

    handleReorder = () => {

    }

    render() {
        return (
            <div>
                <Container fluid id='editcontainer'>
                    <Menu secondary size='tiny' icon='labeled'>
                        <Container>
                            <Menu.Menu position='right'>
                                <Menu.Item name='plus' onClick={this.handleAddSectionButton}>
                                    <Icon inverted name='plus' color='blue' />
                                    Add Section
                                </Menu.Item>

                                <Modal
                                    trigger={<Menu.Item onClick={this.handleOpen} name='ordered list'><Icon inverted name='ordered list' color='blue' />Reorder</Menu.Item>}
                                    open={this.state.modalOpen}
                                    onClose={this.handleClose}
                                    closeIcon='close'
                                >
                                    <Header icon='ordered list' content='Reorder Sections' />
                                    <Modal.Content>
                                        <Message color='blue'>Drag and drop any section to reorder your timeline! It will be automatically saved.</Message>
                                        <SortableComponent items={this.state.timelineitems}/>
                                    </Modal.Content>
                                </Modal>

                                <Menu.Item name='save'>
                                    <Icon inverted name='save' color='blue' />
                                    Save
                                </Menu.Item>
                                <Modal
                                    trigger={<Menu.Item name='eye'><Icon inverted name='eye' color='blue' />Preview</Menu.Item>}
                                    open={this.state.modalOpen}
                                    onClose={this.handleClose}
                                    closeIcon='close'
                                >
                                    <Header icon='eye' content='Preview Presentable Timeline' />
                                    <Modal.Content>
                                        <Timeline timelineitems={this.state.timelineitems} />
                                    </Modal.Content>
                                </Modal>
                                <Menu.Item name='send'>
                                    <Icon inverted name='send' color='blue' />
                                    Publish
                                </Menu.Item>
                            </Menu.Menu>
                        </Container>
                    </Menu>



                    <Container> {/* timeline title */}
                        <Segment textAlign='center' padded basic>
                            <div id='lotus'></div>
                            <Input id='timeline-title' size='small' placeholder='Title' value={this.state.title} onChange={event => this.handleTimelineTitleChange(event)} onFocus={this.handleTitleInputFocus} onBlur={this.handleTitleInputFocus} transparent={this.state.titleVisibleInput} />
                        </Segment>
                    </Container>
                    <Container > {/* timeline sections */}
                        <EditTimeline timelineitems={this.state.timelineitems} addsection={this.handleAddSectionButton}>
                        </EditTimeline>
                    </Container>
                </Container>
            </div>
        )
    }
}

const SortableItem = SortableElement(({ value }) =>
    <div className='reorderitem'>{value}</div>
);

const SortableList = SortableContainer(({ items }) => {
    return (
        <div id='reorderlist'>
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value} />
            ))}
        </div>
    );
});

class SortableComponent extends Component {
    state = {
        items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
    };
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex),
        });
    };
    render() {
        return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
    }
}

export default Edit
