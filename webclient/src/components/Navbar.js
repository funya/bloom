import React, { Component } from 'react';

import { Menu, Container, Image } from 'semantic-ui-react'

import { Link } from 'react-router-dom';


import image from '../img/lotus.svg';

class TopNavBar extends Component {
	render() {
		return (
			<Menu fixed='top'>
				<Container>
						<Menu.Item  header as={Link} to='/'>	
							<Image size='mini' src={image} id='nav-logo'></Image>
							Bloom
						</Menu.Item>
					<Menu.Menu position='right'>
						<Menu.Item name='home' as={Link} to='/'>
							Home
       					</Menu.Item>
						<Menu.Item name='about' as={Link} to='/about'>
							About
        				</Menu.Item>
						{/*<Menu.Item name='account' active={activeItem === 'account'} onClick={this.handleItemClick} as={Link} to='/account'>
							Account
        				</Menu.Item>*/}
						<Menu.Item name='login' as={Link} to='/login'>
							Log in
        				</Menu.Item>
						<Menu.Item name='signup' as={Link} to='/signup'>
							Sign Up
        				</Menu.Item>
						<Menu.Item name='account' as={Link} to='/account'>
							Account
        				</Menu.Item>
					</Menu.Menu>
				</Container>
			</Menu>
		)
	}
}

export default TopNavBar;
