import { combineReducers } from 'redux'
import visibilityFilter from './visibilityFilter'
import timelineitems from './timelineitems'
import rightsidebarform from './rightsidebarform'

const BloomApp = combineReducers({
    visibilityFilter,
    timelineitems,
    rightsidebarform
})

export default BloomApp