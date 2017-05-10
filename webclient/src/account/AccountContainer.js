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
            visibleNewModal: false,
            newStoryLoading: false,
            newstorydescription: "",
            newstoryname: "",
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

    showNewModal = (dimmer) => () => this.setState({ dimmer, visibleNewModal: true })
    hideNewModal = () => this.setState({ visibleNewModal: false })

    componentDidMount = () => {
        this.fetchStories()
    }

    submitStory = (e) => {
        e.preventDefault()
        this.setState({ newStoryLoading: true })
        fetch(`${apiRoot}/stories`, {
            mode: "cors",
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem(storageKey)
            }),
            body: JSON.stringify({
                name: this.state.newstoryname,
                description: this.state.newstorydescription
            })
        })
            .then(resp => {
                if (resp.ok) {
                    this.setState({ newStoryLoading: false })
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
                this.setState({ newstorydescription: "", newstoryname: "" })
                console.log(data)
                this.fetchStories()
            })
            .catch(err => {
                console.log(err)
                return null
            })
        this.setState({ visibleNewModal: false })
    }

    handleNameInput = (e) => {
        this.setState({ newstoryname: e.target.value, })
    }

    handleDescriptionInput = (e) => {
        this.setState({ newstorydescription: e.target.value, })
    }

    render() {
        console.log("Rendering Account comp. State: ", this.state)
        return <Account
            {...this.state}
            showNewModal={this.showNewModal}
            hideNewModal={this.hideNewModal}
            fetchStories={this.fetchStories}
            handleDescriptionInput={this.handleDescriptionInput}
            handleNameInput={this.handleNameInput}
            submitStory={this.submitStory}
        />
    }
}

export default AccountContainer