import React, { Component } from 'react';
import { Header, Container, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'

class Footer extends Component {

	render() {

		return (
			<Container id="footer" fluid>
				<Container>
					<Segment basic>
						<Link to="/">Home</Link>
						{" | "}
                        <Link to={{pathname:"/about"}}>About</Link>
						{" | "}
						<Link to={{pathname:"/tos"}}>Terms of Service</Link>
						{" | "}
                        <Link to={{pathname:"/privacy"}}>Privacy Policy</Link>
						{" | "}
                        <a href="https://www.apichaya.org">API Chaya</a>
                        <span id='copyright'>Bloom &copy; 2017</span>
					</Segment>
				</Container>
			</Container>
		)
	}
}

export default Footer;