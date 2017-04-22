import React, { Component, PropTypes } from 'react';
//import { Container, Header, Image, Icon, Segment } from 'semantic-ui-react'
//import classNames from 'classnames';

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