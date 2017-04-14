let nextTimelineItemId = 0

//action creators
export const addTimelineItem = (body, title, date) => {
    return { 
        type: 'ADD_TIMELINE_ITEM',
        id: nextTimelineItemId++,
        body,
        title,
        date
    }
}

export const toggleTimelineItem = (id) => {
    return {
        type: 'TOGGLE_TIMELINE_ITEM',
        id
    }
}

export const setVisibilityFilter = (filter) => {
    return {
        type: 'SET_VISIBILITY_FILTER',
        filter
    }
}