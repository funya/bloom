import React, { Component } from 'react';
import 'whatwg-fetch';
import Timeline from '../components/Timeline';
import { Container, Segment, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import image from '../img/lotus.svg';
import ConfirmationModal from './ConfirmationModal'

class Preview extends Component {

    render() {
        const { story, items } = this.props
        return (
            <Container className='previewcontainer'>
                <Segment basic padded>
                    <Link className='ui button' to={{ pathname: `/story/${story.id}/edit`, state: { id: story.id, name: story.name } }}>
                        <Icon name='long arrow left' />
                        Back
                    </Link>
                    <ConfirmationModal story={story}/>
                </Segment>
                <Segment basic padded>
                    <Image src={image} size='medium' centered/>
                    <Timeline timelineitems={items} />
                </Segment>
            </Container>
        )
    }
}

export default Preview