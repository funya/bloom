import sections from './sections.json'

const timelineitem = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TIMELINE_ITEM':
            return {
                id: action.id,
                text: action.text,
                public: false
            }
        case 'TOGGLE_TIMELINE_ITEM':
            if (state.id !== action.id) {
                return state
            }

            return {
                ...state,
                public: !state.public
            }

        default:
            return state
    }
}

const timelineitems = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TIMELINE_ITEM':
           return [
               ...state,
               timelineitem(undefined, action)
           ]
        case 'TOGGLE_TIMELINE_ITEM':
           return state.map(t =>
                timelineitem(t, action)
           )
        default:
            return state
    }
}

export default timelineitems