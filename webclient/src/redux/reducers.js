import { remove, findIndex } from 'lodash';
import { combineReducers } from 'redux';


let fetching = (state = { fetch: "", count: 0 }, action) => {
    switch (action.type) {
        case "FETCH START":
            return { count: state.count + 1, fetch: action.fetch }
        case "FETCH END":
            return { count: state.count - 1, fetch: action.fetch }
        case "FETCH ARRANGE START":
            return { count: state.count + 1, fetch: action.fetch }
        case "FETCH ARRANGE END":
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
        case "REARRANGE SECTION":
            var x = { ...state }
            x[action.storyid] = action.data
            return x
        case "EDIT SECTION":
            var x = { ...state }
            var sections = x[action.storyid]
            var i = findIndex(sections, (s) => { return s.id === action.data.id })
            sections[i] = action.data
            x[action.storyid] = sections
            return x
        case "DELETE SECTION":
            var x = { ...state }
            var sections = x[action.storyid]
            var newsection = remove(sections, s => { return s.id !== action.sectionid })
            x[action.storyid] = newsection
            return x
        default:
            return state
    }
}

let currentSection = (state = {}, action) => {
    switch (action.type) {
        case "SET CURRENT SECTION":
            return action.data;
        case "UPDATE NEW SECTION TEXT":
            return { ...state, body: action.data}
        default:
            return state
    }
}

let gridWidth = (state= "317px", action) => {
    switch (action.type) {
        case "SET GRID WIDTH":
            return action.data;
        default:
            return state;
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
    currentSection,
    gridWidth,
})

export default rootReducer
