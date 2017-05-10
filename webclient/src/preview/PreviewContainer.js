import React, { Component } from 'react';
import 'whatwg-fetch'
import Preview from './Preview'
import { apiRoot, storageKey } from '../authentication/Auth'



class PreviewContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            story: this.props.location.state,
            items: []
        }
    }

    componentDidMount() {
        this.setState({ loading: true })
        // Get the single story information 
        fetch(`${apiRoot}/stories/${this.state.story.id}`, {
            mode: "cors",
            headers: new Headers({
                "Authorization": localStorage.getItem(storageKey)
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
                this.setState({ items: data, loading: false })
            })
            .catch(err => {
                this.setState({ loading: false })
                console.log(err)
                return null
            })
    }

    render() {
        console.log("Rendering Preview: ", this.state)
        return (
            <Preview {...this.state}/>
        )
    }
}

export default PreviewContainer