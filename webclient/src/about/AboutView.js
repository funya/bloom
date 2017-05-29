import React, { Component } from 'react';
import { Header, Container, Segment, Image, Grid, Menu, Divider } from 'semantic-ui-react';
import ScrollToTop from '../components/ScrollToTop';
import { NavLink } from 'react-router-dom';
import './About.css';
import { Route } from 'react-router-dom';
import lotus from '../img/lotus.svg';

import About from './About';
import Privacy from './Privacy';
import Tos from './Tos';

class AboutView extends Component {


    render() {
        return (
            <Container className="aboutcontainer">
                <ScrollToTop />
                <Grid>
                    <Grid.Column width={4} stretched>
                        <Menu fluid vertical tabular style={{ marginTop: "10vh" }}>
                            <Menu.Item as={NavLink} to='/about' name='About' />
                            <Menu.Item as={NavLink} to='/tos' name='Terms of Service' />
                            <Menu.Item as={NavLink} to='/privacy' name='Privacy Policy' />
                        </Menu>
                    </Grid.Column>
                        
                    <Grid.Column stretched width={12}>
                        <Route exact strict path="/about" component={About} />
                        <Route exact path="/tos" component={Tos} />
                        <Route exact path="/privacy" component={Privacy} />
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

export default AboutView