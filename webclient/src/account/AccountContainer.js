import React, { Component } from 'react';
import { apiRoot, storageKey } from '../authentication/Auth'
import Account from './Account'
import './account.css'

class AccountContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: JSON.parse(localStorage.getItem("u")),
            stories: [],
            loading: false,
            openModal: false,
            loadingform: false,
            deleteModalOpen: false,
        }
    }

    fetchStories = () => {
        this.setState({ loading: true })
        fetch(`${apiRoot}/stories?author=${this.state.user.id}`, {
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
                this.setState({ stories: data, loading: false })
                return data
            })
            .catch(err => {
                this.setState({ loading: false })
                console.log(err)
                return null
            })
    }


    showmodal = (dimmer) => () => this.setState({ dimmer, openModal: true })
    closemodal = () => this.setState({ openModal: false })

    // Event handler that triggers when delete butotn is clicked on delete prompt window
    // deletes the section 
    handleDeleteStory = () => {
        fetch(`${apiRoot}/stories/${this.state.selectedstoryid}`, {
            mode: "cors",
            method: "DELETE",
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
                console.log(data)
            })
            .catch(err => {
                console.log(err)
                return null
            })
        this.setState({ deleteModalOpen: false })
        this.fetchStories()
    }

    // Event handler that open/close the delete prompt modal
    showDeleteModal = () => () => this.setState({ deleteModalOpen: true })
    closeDeleteModal = () => this.setState({ deleteModalOpen: false })

    componentDidMount = () => {
        this.fetchStories()
    }

    render() {
        console.log("Rendering Account comp. State: ", this.state)
        return <Account
            {...this.state}
            showmodal={this.showmodal}
            closemodal={this.closemodal}
            showDeleteModal={this.showDeleteModal}
            closeDeleteModal={this.closeDeleteModal}
            handleDeleteStory={this.handleDeleteStory}
        />
    }
}

export default AccountContainer