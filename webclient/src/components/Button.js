import React, { Component } from 'react';

import { Link } from 'react-router-dom';


class Btn extends Component {
    
    render() {
        return (
            <Link className='btn' to={this.props.path}>{this.props.content}</Link>
        )
    }
}

export default Btn