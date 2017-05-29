import React, { Component } from 'react';
import { apiRoot, storageKey } from '../authentication/Auth'
import Account from './Account';
import './account.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getMyStories } from '../redux/actions';

class AccountContainer extends Component {

    componentWillMount = () => {
        this.props.getMyStories()
    }

    render() {
        return <Account
            {...this.props}
        />
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        myStories: state.myStories,
        fetching: state.fetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getMyStories,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer)