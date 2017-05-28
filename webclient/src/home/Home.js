import React, { Component } from 'react';
import { Container, Header, Image, Grid, Card, Dimmer, Loader, Segment } from 'semantic-ui-react'
import image from '../img/lotus.svg';
import { Link } from 'react-router-dom';
import './home.css';
import StoryItem from './StoryItem';
import ScrollToTop from '../components/ScrollToTop';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getStories } from '../redux/actions';


class Home extends Component {

    componentDidMount() {
        this.props.getStories()
    }

    render() {
        const { stories, fetching, fetchError } = this.props

        return (
            <Container id='homecontainer' fluid>
                <ScrollToTop />
                <Container id='hero-container' fluid>
                    <Segment textAlign='center' basic padded>
                        <Image centered src={image} size='medium' style={{ paddingRight: "5px" }} />
                        <Header as='h2' textAlign='center' className='hero-title'>We are API Chaya and we are collecting stories on</Header>
                        <Header as='h1' textAlign='center' className='hero-title'>sexual assault, domestic violence, and human trafficking.</Header>

                        {
                            (localStorage.getItem("auth") !== null && localStorage.getItem("auth").length > 0) ? (
                                <Link className='ui button green' id='action-button' to={`/account`}>
                                    Do you have a story?
                                </Link>
                            ) : (
                                    <Link className='ui button green' id='action-button' to={`/signup`}>
                                        Do you have a story?
                                </Link>
                                )
                        }
                    </Segment>
                </Container>
                <Container fluid id='stories-container'>
                    <Dimmer.Dimmable as={Segment} dimmed={fetching.count !== 0} padded='very' basic>
                        <Dimmer active={fetching.count !== 0 && fetching.fetch.includes("stories")} inverted>
                            <Loader inverted content='Loading' />
                        </Dimmer>
                        <Segment basic padded='very' className='stories-grid-container'>
                            {stories.map(story =>
                                <div key={story.id} style={{ marginBottom: "30px", width: Math.floor(Math.random() * 380) + 300, minHeight: "100%" }} className='story-item-container'>
                                    <StoryItem
                                        {...story}
                                    />
                                </div>
                            )}
                        </Segment>
                    </Dimmer.Dimmable>
                </Container>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        fetching: state.fetching,
        fetchError: state.fetchError,
        stories: state.stories
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getStories
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
