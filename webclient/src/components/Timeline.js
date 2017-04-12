import React, { Component, PropTypes } from 'react';
import { Container, Header } from 'semantic-ui-react'
import classNames from 'classnames';

import TimelineItem from './TimelineItem'

//import { Menu, Container, Header, Image, Button, Grid, Input } from 'semantic-ui-react'

class Timeline extends Component {

    render() {
        const { timelineitems, onTimelineItemClick  } = this.props
        console.log(this.props)
        
        return (
            <div>
                <Container className='timeline-heading' textAlign='center'>
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
        id: PropTypes.number.isRequired
    }).isRequired).isRequired
}

export default Timeline