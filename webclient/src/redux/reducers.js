import { remove, findIndex } from 'lodash';
import { combineReducers } from 'redux';


let fetching = (state = { fetch: "", count: 0 }, action) => {
    switch (action.type) {
        case "FETCH START":
            return { count: state.count + 1, fetch: action.fetch }
        case "FETCH END":
            return { count: state.count - 1, fetch: action.fetch }
        default:
            return state
    }
}

let fetchError = (state = "", action) => {
    switch (action.type) {
        case "FETCH END":
            return action.message
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
        default:
            return state
    }
}

let myStories = (state = [], action) => {
    switch (action.type) {
        case "SET MY STORIES":
            return action.data;
        case "ADD STORY":
            return state.concat([action.data])
        case "UPDATE PRIVACY":
            let stories = state.concat([])
            let storyindex = findIndex(stories, function (story) { return story.id === action.storyid; });
            stories[storyindex] = action.data
            return stories
        case "DELETE STORY":
            return remove(state, function (story) { return story.id !== action.storyid; });
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
            x[action.storyid] = action.data
            return x
        case "ADD SECTION":
            return { ...state, ...state[action.data.storyid].push(action.data) }
        case "DELETE SECTION":
            var x = { ...state }
            var messages = x[action.storyid]
            var newmessages = remove(messages, m => { return m.id !== action.messageid })
            x[action.storyid] = newmessages
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
    myStories,
    currentStory,
    sections,
})

export default rootReducer
