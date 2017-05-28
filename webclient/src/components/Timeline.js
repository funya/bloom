import React, { Component } from 'react';
import TimelineItem from './TimelineItem';

import { connect } from 'react-redux';


class Timeline extends Component {
    render() {
        const { sections, storyid } = this.props

        let items = sections[storyid]

        return (
            items !== undefined && (
                <ul className='timeline timeline-centered'>
                    {items.map(section =>
                        <TimelineItem
                            {...section}
                            key={section.id}
                        />
                    )}
                </ul>
            )
        )
    }
}

const mapStateToProps = (state) => {
    return {
        sections: state.sections
    }
}

export default connect(mapStateToProps)(Timeline)