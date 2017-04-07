import {createStore} from "redux";
import 'whatwg-fetch';

//action types
const ADD_SECTION = 'ADD_SECTION'; 
const EDIT_SECTION = 'EDIT_SECTION';

function reducer(state, action) {
    switch(action.type) {
        case ADD_SECTION:
            console.log("Adding section")
            break;
        case EDIT_SECTION:
            console.log("edit section")
            break;
        default:
            return state;
    }
}

//action creators
export function addSection(content, title) {
    return {
        type: ADD_SECTION,
        title: title,
        content: content
    }
}

export function editSection(content, title) {
    return {
        
    }
}

//export var store = createStore(reducer, savedState || DEFAULT_STATE);