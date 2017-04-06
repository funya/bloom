import React, { Component } from 'react';

import './App.css';
import { Menu, Container, Header, Image, Button, Grid } from 'semantic-ui-react'

import image from './img/image.png';
import mediaparagraph from './img/mediaparagraph.png';
import paragraph from './img/paragraph.png';

class TopNavBar extends Component {
	state = {}

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	render() {
		const { activeItem } = this.state

		return (
			<Menu fixed='top' inverted>
				<Container>
					<a href="#">
						<Menu.Item link header>
							Bloom
						</Menu.Item>
					</a>
					<Menu.Menu position='right'>
						<Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} link>
							Home
       					</Menu.Item>
						<Menu.Item name='about' active={activeItem === 'about'} onClick={this.handleItemClick} link>
							About
        				</Menu.Item>
						<Menu.Item name='account' active={activeItem === 'account'} onClick={this.handleItemClick} link>
							Account
        				</Menu.Item>
					</Menu.Menu>
				</Container>
			</Menu>
		)
	}
}

class BottomFooter extends Component {

	render() {
		return (
			<Menu inverted content='Footer' id="footer">

			</Menu>
		)
	}
}

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

class App extends Component {
	render() {
		return (
			<div>
				<TopNavBar />
				<Container fluid className='body'>
					<Container id="jumbo" textAlign='center'>
						<Image centered={true} src='https://www.pissedconsumer.com/themes/foundation/images/featured_placeholder-400x300.png' size='small' />
						<Header size='huge'>You have the power to own your story</Header>
						<Button size='small'>Submit Your Own</Button>
					</Container>
					<StoriesGrid />
					<StoriesGrid />
				</Container>
				<BottomFooter></BottomFooter>
			</div>
		);
	}
}

export default App;
