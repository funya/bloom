import React, { Component } from 'react';

import { Container, Header, Image, Grid } from 'semantic-ui-react'

import image from '../img/image.png';
import mediaparagraph from '../img/mediaparagraph.png';
import paragraph from '../img/paragraph.png';


import Btn from '../components/Button.js';



class StoriesGrid extends Component {
	render() {
		return (
			<Container>
				<Grid celled>
					<Grid.Row>
						<Grid.Column width={3}>
							<Image src={image} />
						</Grid.Column>
						<Grid.Column width={13}>
							<Image src={paragraph} />
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={3}>
							<Image src={paragraph} />
						</Grid.Column>
						<Grid.Column width={10}>
							<Image src={mediaparagraph} />
						</Grid.Column>
						<Grid.Column width={3}>
							<Image src={mediaparagraph} />
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={3}>
							<Image src={image} />
						</Grid.Column>
						<Grid.Column width={10}>
							<Image src={paragraph} />
						</Grid.Column>
						<Grid.Column width={3}>
							<Image src={image} />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		)
	}
}

class Home extends Component {
	render() {
		return (
			<Container fluid className='body'>
				<Container id="jumbo" textAlign='center'>
					<Image centered={true} src={image} size='small' />
					<Header size='huge'>You have the power to own your story</Header>
						
						<Btn path='/story' content='Submit Your Own' />
						
				</Container>
				<StoriesGrid />
				<StoriesGrid />
			</Container>
		);
	}
}

export default Home
