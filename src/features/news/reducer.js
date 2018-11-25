import * as type from './types';


const initialState = {
    listNews: [],
    page: 1,
    detail: null,
    loading: false,
    query: 'singapore',
}

const ACTION_HANDLERS = {
    [type.APPEND_NEWS]: (state, action) => {
        return {
            ...state,
            listNews: [
                ...state.listNews,
                ...action.payload
            ],
        }
    },
    [type.SET_NEWS]: (state, action) => {
        return {
            ...state,
            listNews: [
                ...action.payload
            ],
        }
    },
    [type.VIEW_NEWS]: (state, action) => {
        return {
            ...state,
            detail: action.payload,
        }
    },
    [type.LOADING_NEWS]: (state, action) => {
        return {
            ...state,
            loading: action.payload,
        }
    },
    [type.SET_PAGE]: (state, action) => {
        return {
            ...state,
            page: action.payload,
        }
    },
    [type.SET_QUERY]: (state, action) => {
        return {
            ...state,
            query: action.payload,
        }
    },
}

export default function reducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}