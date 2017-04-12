import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react'

import VisibleTimeline from '../containers/VisibleTimeline'

class Edit extends Component {
    componentDidMount() {
            document.title = "Bloom | Edit";
    }

    render() {
        return (
             <Container fluid={true}>
                <Grid centered>
                    <Grid.Row>
                        <Grid.Column width={13}>
                            <VisibleTimeline />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

export default Edit