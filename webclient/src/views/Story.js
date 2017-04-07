import React, { Component } from 'react';

import { Container, Grid, Header } from 'semantic-ui-react'

//import { Menu, Container, Header, Image, Button, Grid, Input } from 'semantic-ui-react'

class Story extends Component {
    render() {
        return (
            <Container fluid={true}>
                <Grid centered>
                    <Grid.Row>
                        <Grid.Column width={13}>
                            <Container textAlign='center'>
                                <Header>Point of No Return</Header>
                                <p>Queer / Filipina / Woman / 42 years old</p>
                            </Container>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

export default Story