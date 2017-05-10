import React, { Component } from 'react';


import TimelineItem from './TimelineItem'


class Timeline extends Component {

    render() {
        return (
            <ul className='timeline timeline-centered'>
                {this.props.timelineitems.map(timelineitem =>
                    <TimelineItem
                        onClick={(event) => this.props.onTimelineItemClick(event)}
                        {...timelineitem}
                        key={timelineitem.id}
                    />
                )}
            </ul>
        )
    }
}

export default Timeline