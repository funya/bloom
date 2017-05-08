import React, { Component } from 'react';
import { Icon, Form, Input, Segment, Label, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types';

import TimelineItem from '../TimelineItem'

class EditTimelineItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            body: ""
        };
    }

    handleItemMouseEnter = () => {
        //console.log(this)
    }

    handleEditBody = (event) => this.setState({ body: event.target.value })


    render() {
        return (
            <li className="timeline-item" onMouseEnter={this.handleItemMouseEnter}>
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                    <Segment>
                        <Label attached='top'></Label>
                        <Form size='small'>
                            <Form.Input control='Input' label='Image' type='file' icon='image' accept='image/*'/>
                            <Form.TextArea value={this.state.body} onChange={event => this.handleEditBody(event)} placeholder='Tell us your story' />

                            <Button size='tiny' className='timelineitem-submit-button'>Submit</Button>
                        </Form>
                    </Segment>
                </div>
            </li>
        )
    }
}

EditTimelineItem.propTypes = {
    id: PropTypes.number.isRequired
}


class EditTimeline extends Component {

    render() {
        return (
            <ul className='timeline'>
                {this.props.timelineitems.map(timelineitem =>
                    <EditTimelineItem
                        {...timelineitem}
                        key={timelineitem.id}
                    />
                )}
                <li className='timeline-item'>

                    <div className="timeline-marker">
                </div>
                </li>
            </ul>
        )
    }
}

EditTimeline.propTypes = {
    timelineitems: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
    }).isRequired).isRequired
}

export default EditTimeline

//
//
//
//
//
//
//