import React, { Component, PropTypes } from 'react';
import { Icon, Form, Input, Segment, Label, Button } from 'semantic-ui-react'

import TimelineItem from './TimelineItem'

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
                        <Label color='pink' attached='top'>Section {this.props.id}</Label>
                        <Form size='small'>
                            <Form.Input control='Input' label='Date(Optional)' type='date' icon='calendar' width='7'/>
                            <Form.Input control='Input' label='Image' type='file' icon='image'/>
                            <Form.Input control='Input' label='Audio' type='file' icon='volume up'/>

                            <Form.TextArea value={this.state.body} onChange={event => this.handleEditBody(event)} label='Body Content' placeholder='Tell us your story' />

                            <Button type='submit' color='green' size='tiny' inverted>Submit</Button>
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
            <ul className='timeline timeline-centered'>
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