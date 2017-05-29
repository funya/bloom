import React, { Component } from 'react';
import 'whatwg-fetch';
import Timeline from '../components/Timeline';
import  ScrollToTop from '../components/ScrollToTop';
import { Container, Segment, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import image from '../img/lotus.svg';
import ConfirmationModal from './ConfirmationModal';
import './preview.css';

import { connect } from 'react-redux';

class PreviewContainer extends Component {

    render() {
        const { currentStory, sections } = this.props
        return (
            <Container className='previewcontainer'>
                <ScrollToTop />
                <Segment basic padded style={{marginTop:"50px"}}>
                    <Link className='ui button back-button blue' to={`/story/${currentStory.id}/edit`}>
                        Edit
                    </Link>
                    <ConfirmationModal />
                </Segment>
                <Segment basic padded>
                    <Image src={image} size='medium' centered/>
                    <Timeline storyid={currentStory.id}/>
                </Segment>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentStory: state.currentStory,
    }
}

export default connect(mapStateToProps)(PreviewContainer)