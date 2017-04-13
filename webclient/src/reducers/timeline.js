const timeline = (state = {}, action) => {
    switch (action.type) {
        case 'EDIT_TITLE':
            return {
                ...state,
                title: action.title
            }
        case 'TOGGLE_PUBLIC':
            return {
                ...state,
                public: !state.ispublic
            }
        default:
            return state
    }
}

export default timeline