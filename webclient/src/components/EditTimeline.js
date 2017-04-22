import React, { Component, PropTypes } from 'react';
import { Icon, Form, Input } from 'semantic-ui-react'

import TimelineItem from './TimelineItem'

class EditTimelineItem extends Component {
    handleItemMouseEnter = () => {
        //console.log(this)
    }

    render() {
        return (
            <li className="timeline-item" onMouseEnter={this.handleItemMouseEnter}>
                <div className="timeline-info"></div>
                <div className="timeline-marker">
                </div>
                <div className="timeline-content">
                    <Form size='small'>
                            <Form.Field width='7' inline>
                                <label>Date (Optional)</label>
                                <Input icon='calendar' type='date' />
                            </Form.Field>
                            <Form.Field>
                                <label>Image</label>
                                <Input icon='picture' type='file' />
                            </Form.Field>
                            <Form.Field>
                                <label>Audio</label>
                                <Input icon='volume up' type='file' />
                            </Form.Field>

                        <Form.TextArea label='Body Content' defaultValue={this.props.body} placeholder='Tell us your story' />
                    </Form>
                </div>

            </li>
        )
    }
}

EditTimelineItem.propTypes = {
    body: PropTypes.string.isRequired,
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