import 'whatwg-fetch';

//action types
const ADD_SECTION = 'ADD_SECTION'; 
const EDIT_SECTION = 'EDDIT_SECTION';

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