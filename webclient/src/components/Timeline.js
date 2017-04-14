import React, { Component, PropTypes } from 'react';
import { Container, Header, Image, Icon, Segment } from 'semantic-ui-react'
import classNames from 'classnames';

import image from '../img/image.png';
import TimelineItem from './TimelineItem'


class Timeline extends Component {

    render() {
        console.log("Timeline.js props", this.props)
        return (
            <ul className='timeline'>
                {this.props.timelineitems.map(timelineitem =>
                    <TimelineItem
                        onClick={() => this.props.onTimelineItemClick(timelineitem.id)}
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
    }).isRequired).isRequired,
    onTimelineItemClick: PropTypes.func.isRequired
}

export default Timeline