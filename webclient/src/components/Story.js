import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Container, Segment, Image, Header } from 'semantic-ui-react';
import image from '../img/lotus.svg';
import Timeline from '../components/Timeline';
import  ScrollToTop from '../components/ScrollToTop';
import './story.css';
import { find } from 'lodash';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSections, getStories, setCurrentPublicStory } from '../redux/actions';


class Story extends Component {

    componentDidMount() {
        let storyid = this.props.match.params.id

        if (this.props.stories.length === 0) {
            this.props.getStories()
                .then(data => {
                    this.props.setCurrentPublicStory(storyid)
                    this.props.getSections(storyid)
                })
        } else {
            this.props.setCurrentPublicStory(storyid)
            this.props.getSections(storyid)
        }
    }

    render() {
        const { currentStory } = this.props

        return (
            <Container id='storycontainer'>
                <ScrollToTop />
                <Segment basic padded='very'>
                    <Header as='h1' textAlign='center' id='story-title'>{currentStory.name}</Header>
                    <Header as='h3' textAlign='center' id='story-description'>{currentStory.description}</Header>
                </Segment>
                <Segment basic padded>
                    <Image src={image} size='medium' centered />
                    <Timeline storyid={currentStory.id}/>
                </Segment>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        stories: state.stories,
        currentStory: state.currentStory
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getSections,
        getStories,
        setCurrentPublicStory
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Story)