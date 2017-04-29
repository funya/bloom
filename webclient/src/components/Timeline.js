import React, { Component } from 'react';
import PropTypes from 'prop-types';


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

Timeline.propTypes = {
    timelineitems: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
    }).isRequired).isRequired
}

export default Timeline