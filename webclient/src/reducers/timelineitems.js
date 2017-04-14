import example from './exampleedit.json'

const timelineitem = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TIMELINE_ITEM':
            return {
                id: action.id,
                body: action.body,
                title: action.title,
                date: action.date,
                ispublic: false
            }
        case 'TOGGLE_TIMELINE_ITEM':
            if (state.id !== action.id) {
                return state
            }

            return {
                ...state,
                ispublic: !state.public
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