import React, { Component } from 'react';
import { Container, Segment, Header, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './preview.css';
import lotus from '../img/lotus.png';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { togglePrivacy } from '../redux/actions';


class Confirmation extends Component {
    componentDidMount() {
        this.props.togglePrivacy(false, this.props.currentStory)
    }

    render() {
        return (
            <Container className='previewcontainer'>
                <Segment basic padded style={{marginTop:'15vh'}}>
                    <Image src={lotus} centered size='medium'/>
                    <Header as='h1' textAlign='center'>
                        Thank you for sharing your story, for your bravery, and your resiliency.
                    </Header>
                </Segment>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentStory: state.currentStory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        togglePrivacy
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation)