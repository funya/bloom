import { remove } from 'lodash';
import { combineReducers } from 'redux';


let fetching = (state = {}, action) => {
    switch (action.type) {
        case "FETCH START":
            return { ...action.data, count: { ...state.count + 1 } }
        case "FETCH END":
            return { ...action.data, count: { ...state.count - 1 } }
        default:
            return state
    }
}

let fetchError = (state = "", action) => {
    switch (action.type) {
        case "FETCH END":
            return action.error
        default:
            return state
    }
}

let currentUser = (state = {}, action) => {
    switch (action.type) {
        case "SET CURRENT USER":
            return action.data;
        default:
            return state
    }
}

let stories = (state = [], action) => {
    switch (action.type) {
        case "SET STORIES":
            return action.data;
        case "NEW STORY":
            return state.concat([action.data])
        default:
            return state
    }
}

let currentStory = (state = {}, action) => {
    switch (action.type) {
        case "SET CURRENT STORY":
            if (action.data === undefined) {
                return state
            }
            return action.data;
        default:
            return state
    }
}

let sections = (state = {}, action) => {
    switch (action.type) {
        case "SET SECTIONS":
            var x = { ...state }
            x[action.channelid] = action.data
            return x
        case "NEW SECTION":
            return { ...state, ...state[action.data.channelid].push(action.data) }
        case "DELETE SECTION":
            var x = { ...state }
            var messages = x[action.channelid]
            var newmessages = remove(messages, m => { return m.id !== action.messageid })
            x[action.channelid] = newmessages
            return x
        default:
            return state
    }
}

const rootReducer = combineReducers({
    fetching,
    fetchError,
    currentUser,
    stories,
    currentStory,
    sections,
})

export default rootReducer
