import React, { PropTypes, Component } from 'react';
//import { Container, Header } from 'semantic-ui-react'
//import classNames from 'classnames';



class TimelineItem extends Component {
    render() {
        return (
            <li className="timeline-item">
                <div className="timeline-info"><span>{this.props.date}</span></div>
                <div className="timeline-marker">
                </div>
                <div className="timeline-content">
                    <h3 className="timeline-title">{this.props.title}</h3>
                    <p>{this.props.body}</p>
                </div>
            </li>
        )
    }
}

TimelineItem.propTypes = {
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    ispublic: PropTypes.bool.isRequired
}

export default TimelineItem