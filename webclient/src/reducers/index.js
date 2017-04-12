import { combineReducers } from 'redux'
import visibilityFilter from './visibilityFilter'
import timelineitems from './timelineitems'


const BloomApp = combineReducers({
    visibilityFilter,
    timelineitems
})

export default BloomApp