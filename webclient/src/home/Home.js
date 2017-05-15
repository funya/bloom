import React, { Component } from 'react';
import { Container, Header, Image, Grid, Card, Dimmer, Loader, Segment } from 'semantic-ui-react'
import { apiRoot } from '../authentication/Auth';
import image from '../img/lotus.svg';
import Btn from '../components/Button.js';
import './home.css'
import StoryItem from './StoryItem'

class Home extends Component {
	state = {
		loading: true,
		stories: []
	}

	componentDidMount() {
		this.setState({ loading: true })
		// Get the single story information 
		fetch(`${apiRoot}/stories`, {
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
				this.setState({ stories: data, loading: false })
			})
			.catch(err => {
				this.setState({ loading: false })
				console.log(err)
				return null
			})
	}

	render() {
		console.log("Rendering Home comp.: ", this.state)
		return (
			<Container id='homecontainer' fluid>
				<Container id='hero-container' fluid>
					<Segment textAlign='center' basic padded>
						<Image centered src={image} size='medium' />
						<Header as='h2' textAlign='center' className='hero-title'>We are API Chaya and we are collecting stories on</Header>
						<Header as='h1' textAlign='center' className='hero-title'>sexual assault, domestic violence, and human trafficking</Header>

						<Btn path='/signup' content='Do you have a story?' id='action-button' />

					</Segment>
				</Container>
				<Container fluid id='stories-container'>
					<Dimmer inverted active={this.state.loading}>
						<Loader>Loading Stories</Loader>
					</Dimmer>
					<Segment basic padded='very'>
						<Grid columns='four'>
							<Grid.Row stretched centered>
								{this.state.stories.map(story =>
									<Grid.Column key={story.id} style={{marginBottom:"30px"}}>
										<StoryItem
											{...story}
										/>
									</Grid.Column>
								)}
							</Grid.Row>
						</Grid>
					</Segment>
				</Container>
			</Container>
		)
	}
}

export default Home
