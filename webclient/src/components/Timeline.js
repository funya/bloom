import React, { Component, PropTypes } from 'react';
import { Container, Header, Image, Icon, Segment } from 'semantic-ui-react'
import classNames from 'classnames';

import image from '../img/image.png';
import TimelineItem from './TimelineItem'


class Timeline extends Component {

    render() {
        return (
            <ul className='timeline'>
                {this.props.timelineitems.map(timelineitem =>
                    <Timeline
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
        date: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        ispublic: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    onTimelineItemClick: PropTypes.func.isRequired
}

export default Timeline