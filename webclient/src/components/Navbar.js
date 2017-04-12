import React, { Component } from 'react';

import { Menu, Container, Image, Input } from 'semantic-ui-react'

import { Link } from 'react-router-dom';


import image from '../img/image.png';

class TopNavBar extends Component {
	state = {}

	handleItemClick = (e, { name }) => this.setState({ activeItem: name })

	render() {
		const { activeItem } = this.state

		return (
			<Menu fixed='top' inverted>
				<Container>
						<Menu.Item  header as={Link} to='/'>	
							<Image size='mini' src={image} id='nav-logo'></Image>
							Bloom
						</Menu.Item>
					<Menu.Menu position='right'>
						<Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} as={Link} to='/'>
							Home
       					</Menu.Item>
						<Menu.Item name='about' active={activeItem === 'about'} onClick={this.handleItemClick} as={Link} to='/about'>
							About
        				</Menu.Item>
						{/*<Menu.Item name='account' active={activeItem === 'account'} onClick={this.handleItemClick} as={Link} to='/account'>
							Account
        				</Menu.Item>*/}
						<Menu.Item name='login' active={activeItem === 'login'} onClick={this.handleItemClick} as={Link} to='/login'>
							Login
        				</Menu.Item>
						<Menu.Item name='signup' active={activeItem === 'signup'} onClick={this.handleItemClick} as={Link} to='/signup'>
							Sign Up
        				</Menu.Item>

					</Menu.Menu>
				</Container>
			</Menu>
		)
	}
}

export default TopNavBar;
