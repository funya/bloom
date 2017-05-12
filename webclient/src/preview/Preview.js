import React, { Component } from 'react';
import 'whatwg-fetch';
import Timeline from '../components/Timeline';
import { Container, Segment, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import image from '../img/lotus.svg';

class Preview extends Component {

    render() {
        return (
            <Container>
                <Segment basic padded>
                    <Link className='ui button' to={{ pathname: `/story/${this.props.story.id}/edit`, state: { id: this.props.story.id, name: this.props.story.name } }}>
                        <Icon name='long arrow left' />
                        Back
                    </Link>
                    <Link className='ui button submit-button' to={{ pathname: `/story/${this.props.story.id}/edit`, state: { id: this.props.story.id, name: this.props.story.name } }}>
                        Submit
                        <Icon name='long arrow right'/>
                    </Link>
                </Segment>
                <Segment basic padded>
                    <Image src={image} size='medium' centered/>
                    <Timeline timelineitems={this.props.items} />
                </Segment>
            </Container>
        )
    }
}

export default Preview