import React, { Component } from 'react';
import { Menu, Container, Image } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom';
import image from '../img/lotus.svg';
import { isEmpty } from 'lodash';
import './navbar.css'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signOut } from '../redux/actions';


class TopNavBar extends Component {
	render() {
		const { signOut, currentUser } = this.props

		if (!isEmpty(currentUser) && localStorage.getItem("auth")) {
			return (
				<Menu fixed='top' className='navbar'>
					<Container>
						<Menu.Item header as={Link} to='/' className='nav-main-item'>
							<Image size='mini' src={image} id='nav-logo'></Image>
							Bloom
						</Menu.Item>
						<Menu.Menu position='right'>
							<Menu.Item name='about' as={Link} to='/about'>
								About
							</Menu.Item>
							<Menu.Item name='account' as={Link} to='/account'>
								Account
							</Menu.Item>
							<Menu.Item name='signout' as='a' onClick={signOut}>
								Sign out
							</Menu.Item>
						</Menu.Menu>
					</Container>
				</Menu>
			)
		} else {
			return (
				<Menu fixed='top' className='navbar'>
					<Container>
						<Menu.Item header as={Link} to='/' className='nav-main-item'>
							<Image size='mini' src={image} id='nav-logo'></Image>
							Bloom
						</Menu.Item>
						<Menu.Menu position='right'>
							<Menu.Item name='about' as={Link} to='/about'>
								About
							</Menu.Item>
							<Menu.Item name='login' as={Link} to='/login'>
								Sign in
							</Menu.Item>
						</Menu.Menu>
					</Container>
				</Menu>
			)
		}
	}
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        signOut,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TopNavBar);
