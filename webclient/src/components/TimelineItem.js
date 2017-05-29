import React, { Component } from 'react';
import { Image, Segment } from 'semantic-ui-react';

class TimelineItem extends Component {
    handleItemMouseEnter = () => {
    }

    render() {
        return (
            <li className="timeline-item" onMouseEnter={this.handleItemMouseEnter}>
                <div className="timeline-info"><span>{this.props.date}</span></div>
                <div className="timeline-marker">
                </div>
                <div className="timeline-content">
                    <h3 className="timeline-title">{this.props.title}</h3>
                    {this.props.image.length > 0 ? (
                        <div>
                            <Image src={this.props.image} className='timeline-image'/>
                            <Segment basic textAlign='center'>{this.props.body} </Segment>
                        </div>
                    ) : (
                            <p>{this.props.body} </p>
                        )
                    }
                </div>
            </li>
        )
    }
}

export default TimelineItem