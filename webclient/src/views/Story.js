import React, { Component } from 'react';

import { Container, Grid, Header } from 'semantic-ui-react'
import classNames from 'classnames';

//import store from '../components/shared-state.js'
//import Timeline from '../components/Timeline.js'
import sections from '../data/sections.json'

class Story extends Component {

    render() {

        var timelineitems = sections.map((item, index) => 
                <li key={index} className="timeline-item">
                    <div className="timeline-info"><span>{item.date}</span></div>
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                        <h3 className="timeline-title">{item.title}</h3>
                        <p>{item.text}</p>
                    </div>
                </li>
        );
        console.log(timelineitems);
        return (
            <Container fluid={true}>
                <Grid centered>
                    <Grid.Row>
                        <Grid.Column width={13}>
                            <Container className='timeline-heading' textAlign='center'>
                                <Header size='huge'>Point of No Return</Header>
                                <p>Queer / Filipina / Woman / 42 years old</p>
                            </Container>
                            <Container >
                                <ul className={classNames('timeline-centered', 'timeline')}>
                                    {timelineitems}
                                </ul>
                            </Container>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

export default Story