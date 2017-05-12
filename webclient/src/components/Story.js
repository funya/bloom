import React, { Component } from 'react';
import { Container, Segment, Image, Header } from 'semantic-ui-react';
import image from '../img/lotus.svg';
import 'whatwg-fetch';
import Timeline from '../components/Timeline';
import { apiRoot, storageKey } from '../authentication/Auth';
import './story.css'

class Story extends Component {
    state={
        story: this.props.location.state,
        loading: false,
        items: []
    }

    componentDidMount() {
        this.setState({ loading: true })
        // Get the single story information 
        fetch(`${apiRoot}/stories/${this.state.story.id}`, {
            mode: "cors",
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    return Promise.reject({
                        status: resp.status,
                        statusText: resp.statusText,
                        statusMessage: resp.text()
                    })
                }
            })
            .then(data => {
                this.setState({ items: data, loading: false })
            })
            .catch(err => {
                this.setState({ loading: false })
                console.log(err)
                return null
            })
    }

    render() {
        console.log("Rendering Story comp.: ", this.state)
        return (
            <Container id='storycontainer'>
                <Segment basic padded>
                    <Header as='h1' textAlign='center' id='story-title'>{this.state.story.name}</Header>
                    <Header as='h3' textAlign='center' id='story-description'>{this.state.story.description}</Header>
                </Segment>
                <Segment basic padded>
                    <Image src={image} size='medium' centered/>
                    <Timeline timelineitems={this.state.items} />
                </Segment>
            </Container>
        )
    }
}

export default Story