import React, { Component } from 'react';

import './App.css';
import { Menu } from 'semantic-ui-react'

class TopNavBar extends Component {
	render() {
		return (
			<Menu>
				<Menu.Header>
				</Menu.Header>
				<Menu className="Item"></Menu>
			</Menu>
		)
	}
}

class App extends Component {
	render() {
		return (
			<div className="App">
				<TopNavBar></TopNavBar>
			</div>
		);
	}
}

export default App;
