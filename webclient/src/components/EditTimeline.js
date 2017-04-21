import React, { Component, PropTypes } from 'react';
import { Icon, Form, Input } from 'semantic-ui-react'

import TimelineItem from './TimelineItem'

class EditTimelineItem extends Component {
    handleItemMouseEnter = () => {
        console.log(this)
    }

    render() {
        return (
            <li className="timeline-item" onMouseEnter={this.handleItemMouseEnter}>
                <div className="timeline-info"></div>
                <div className="timeline-marker">
                </div>
                <div className="timeline-content">
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>Date</label>
                                <input  type='date' />
                            </Form.Field>
                            <Form.Field>
                                <label>Image</label>
                                <input  type='image' />
                            </Form.Field>
                            <Form.Field>
                                <label>Audio</label>
                                <input  type='file' />
                            </Form.Field>
                        </Form.Group>
                        <Form.TextArea label='Body Content' defaultValue={this.props.body} placeholder='Tell us your story' />
                    </Form>
                </div>

            </li>
        )
    }
}

EditTimelineItem.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
}


class EditTimeline extends Component {

    render() {
        console.log("EditTimeline.js props", this.props)
        return (
            <ul className='timeline timeline-centered'>
                {this.props.timelineitems.map(timelineitem =>
                    <EditTimelineItem
                        onClick={(event) => this.props.onTimelineItemClick(event)}
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
    }).isRequired).isRequired,
    onTimelineItemClick: PropTypes.func.isRequired
}

export default EditTimeline