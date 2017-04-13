import React, { Component, PropTypes } from 'react';
import { Container, Header, Image, Icon } from 'semantic-ui-react'
import classNames from 'classnames';

import image from '../img/image.png';
import TimelineItem from './TimelineItem'

//import { Menu, Container, Header, Image, Button, Grid, Input } from 'semantic-ui-react'

class Timeline extends Component {

    render() {
        const { timelineitems, onTimelineItemClick } = this.props
        console.log("Passed down props", timelineitems)
        console.log(this.props)
        return (
            <div>
                <Container>
                    <Image src={image} size='small' />
                    <Header size='huge'>Point of No Return</Header>
                    <p>Queer / Filipina / Woman / 42 years old</p>
                </Container>
                <Container >
                    <ul className='timeline'>
                        {timelineitems.map(timelineitem =>
                            <Timeline
                                onClick={() => onTimelineItemClick(timelineitem.id)}
                                {...timelineitem}
                                key={timelineitem.id}
                            />
                        )}
                        <li className={classNames('timeline-item', 'timeline-add-item')}>
                            <div className="timeline-marker">
                                <Icon name='add' size='small' className='add-timeline-item-button'/>
                            </div>
                        </li>
                    </ul>
                </Container>
            </div>
        )
    }
}

Timeline.propTypes = {
    timelineitems: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        public: PropTypes.bool.isRequired
    }).isRequired).isRequired,
    onTimelineItemClick: PropTypes.func.isRequired
}

export default Timeline