import React, { PropTypes, Component } from 'react';
//import { Container, Header } from 'semantic-ui-react'
//import classNames from 'classnames';



class TimelineItem extends Component {
    render() {
        const { date, title, text } = this.prop
        return (
            <li className="timeline-item">
                <div className="timeline-info"><span>{date}</span></div>
                <div className="timeline-marker">
                </div>
                <div className="timeline-content">
                    <h3 className="timeline-title">{title}</h3>
                    <p>{text}</p>
                </div>
            </li>
        )
    }
}

TimelineItem.propTypes = {
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}

export default TimelineItem