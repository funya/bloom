import React, { Component } from 'react';
import { storageKey, apiRoot } from '../authentication/Auth'
import Account from './Account'
import { Redirect } from 'react-router-dom';

class AccountContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            authenticated: false
        }
    }

    componentDidMount = () => {
        console.log(this)
        fetch(`${apiRoot}/users/me`, {
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
                        statusMessage: resp.text().then(errmsg => { return errmsg })
                    })
                }
            })
            .then(data => {
                this.setState({ user: data, authenticated: true })
                console.log(this.state)
                return data
            })
            .catch(err => {
                console.log(err)
            })
    }



    render() {
        if (this.state.authenticated) {
            return <Account {...this.state} />
        } else {
            return  <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />
        }
    }
}

export default AccountContainer