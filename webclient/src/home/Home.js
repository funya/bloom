import React, { Component } from 'react';
import { Container, Header, Image, Grid, Card, Dimmer, Loader } from 'semantic-ui-react'
import { apiRoot } from '../authentication/Auth';
import image from '../img/lotus.svg';
import Btn from '../components/Button.js';
import StackGrid, { transitions } from "react-stack-grid";
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
			<Container id='homecontainer'>
				<Container id="jumbo" textAlign='center'>
					<Image centered src={image} size='large' />
					<Header as='h1' size='huge'>You have the power to own your story</Header>

					<Btn path='/story' content='Submit Your Own' />

				</Container>
				<Container fluid>
					<Dimmer inverted active={this.state.loading}>
						<Loader>Loading Stories</Loader>
					</Dimmer>
					<StackGrid columnWidth='33.33%' gutterWidth={12} gutterHeight={12} duration={0}>
						{this.state.stories.map(story =>
							<StoryItem
								{...story}
								key={story.id}
							/>
						)}
					</StackGrid>
				</Container>
			</Container>
		)
	}
}

export default Home
