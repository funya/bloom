import React, { Component } from 'react';
import { Container, Segment, Header } from 'semantic-ui-react';
import image from '../img/lotus.svg';
import { apiRoot, storageKey } from '../authentication/Auth';
import { Link } from 'react-router-dom';
import './preview.css'

class Confirmation extends Component {
    componentDidMount() {
        console.log(this.props)
        fetch(`${apiRoot}/stories/${this.props.location.state.story.id}`, {
            mode: "cors",
            method: "PATCH",
            headers: new Headers({
                "Authorization": localStorage.getItem(storageKey)
            }),
            body: JSON.stringify({
                name: this.props.location.state.story.name,
                description: this.props.location.state.story.description || "",
                private: false
            })
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    return Promise.reject({
                        status: resp.status,
                        statusText: resp.statusText,
                        statusMessage: resp.text()
                    })
                }
            })
            .then(data => {
                this.setState({ visible: false })
            })
            .catch(err => {
                console.log(err)
                return null
            })
    }

    render() {
        return (
            <Container className='previewcontainer'>
                <Segment basic padded style={{marginTop:'30vh'}}>
                    <Header as='h1' textAlign='center'>
                        Thank you for sharing your story, for your bravery, and your resiliency.
                    </Header>
                </Segment>
            </Container>
        )
    }
}

export default Confirmation