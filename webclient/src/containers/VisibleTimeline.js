import { connect } from 'react-redux'
import { toggleTimelineItem } from '../actions'
import Timeline from '../components/Timeline'

const getVisibibleTimelineItems = (timelineitems, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return timelineitems
        case 'SHOW_PUBLIC':
            return timelineitems.filter(t => t.public)
        case 'SHOW_PRIVATE':
            return timelineitems.filter(t => !t.public)
        default:
            throw new Error('Unknown filter:' + filter)
    }
}

const mapStateToProps = (state) => ({
  timelineitems: getVisibibleTimelineItems(state.timelineitems, state.visibilityFilter)
})

const mapDispatchToProps = ({
  onTimelineItemClick: toggleTimelineItem
})

const VisibleTimeline = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline)

export default VisibleTimeline