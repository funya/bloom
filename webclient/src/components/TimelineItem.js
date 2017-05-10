import React, {Component } from 'react';

class TimelineItem extends Component {
    handleItemMouseEnter = () => {
        console.log(this)
    }

    render() {
        return (
            <li className="timeline-item" onMouseEnter={this.handleItemMouseEnter}>
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

export default TimelineItem