import types from './types';
import { requestJSON } from '../../utils';

const fetchNews = (page = 1, query = 'singapore') => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        let news = [];
        try {
            dispatch(setLoadingStatus(true));
            const data = await requestJSON(`&q=${query}&page=${page}`, {
                mode: 'cors'
            });
            dispatch(setCurrentPage(page));
            dispatch(setQuery(query));
            dispatch(setLoadingStatus(false));
            if (data.status === 'OK') {
                news = data.response.docs;
            }
        } catch (e) {
            dispatch(setLoadingStatus(false));
            reject(e)
        }
        resolve(news);
    });
}

export const loadNews = () => (dispatch) =>  {
    return new Promise(async (resolve, reject) => {
        const data = await dispatch(fetchNews(1, 'singapore'));
        dispatch({
            type: types.SET_NEWS,
            payload: data
        });
        resolve();
    });
}

export const loadMore = () => async (dispatch, getState) => {
    try {
        const { news } = getState();
        let page = news.page;
        let query = news.query;
        let data = await dispatch(fetchNews(++page, query));
        dispatch({
            type: types.APPEND_NEWS,
            payload: data
        });
    } catch (e) {
        console.log(e);
    }
}

export const search = (query) => async (dispatch, getState) => {
    try {
        let data = await dispatch(fetchNews(1, query));
        dispatch({
            type: types.SET_NEWS,
            payload: data
        });
    } catch (e) {
        console.log(e);
    }
}


export const setLoadingStatus = (status) => ({
    type: types.LOADING_NEWS,
    payload: status
})

export const setCurrentPage = (page) => ({
    type: types.SET_PAGE,
    payload: page
})

export const setQuery = (query) => ({
    type: types.SET_QUERY,
    payload: query
})

export const viewNews = (detail) => ({
    type: types.VIEW_NEWS,
    payload: detail
})

