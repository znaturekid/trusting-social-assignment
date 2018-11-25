import * as actions from '../../../features/news/actions';
import * as types from '../../../features/news/types';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
    afterEach(() => {
        fetchMock.restore()
    })
    it('viewNews function', () => {
        const detail = {
            source: 'The New York Times',
            snippet: 'With ethnic Chinese constituting a majority of Singapore’s population, some fear the country could be an especially tantalizing target for China’s influence.',
            pub_date: '2018-11-13T10:17:52+0000',
            multimedia: []
        };
        const expectedAction = {
            type: types.VIEW_NEWS,
            payload: detail
        }
        expect(actions.viewNews(detail)).toEqual(expectedAction);
    })
    it('setQuery function', () => {
        const query = "singapore";
        const expectedAction = {
            type: types.SET_QUERY,
            payload: query
        }
        expect(actions.setQuery(query)).toEqual(expectedAction);
    })

    it('setCurrentPage function', () => {
        const page = 10;
        const expectedAction = {
            type: types.SET_PAGE,
            payload: page
        }
        expect(actions.setCurrentPage(page)).toEqual(expectedAction);
    })

    it('setLoadingStatus function', () => {
        const loading = true;
        const expectedAction = {
            type: types.LOADING_NEWS,
            payload: loading
        }
        expect(actions.setLoadingStatus(loading)).toEqual(expectedAction);
    })

    it('loadNews function', () => {
        fetchMock.getOnce('https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=5763846de30d489aa867f0711e2b031c&q=singapore&page=1', {
            body: {
                response: {
                    docs: [1,2]
                },
                status: 'OK'
            },
            headers: {
                'content-type': 'application/json'
            }
        })
        const expectedActions = [
            {
                type: types.LOADING_NEWS,
                payload: true
            },
            {
                type: types.SET_PAGE,
                payload: 1
            },
            {
                type: types.SET_QUERY,
                payload: 'singapore'
            },
            {
                type: types.LOADING_NEWS,
                payload: false
            },
            {
                type: types.SET_NEWS,
                payload: [1,2]
            }
        ]
        const store = mockStore({
            news: {
                newLists: [],
                page: 1,
                query: '',
                loading: false
            }
        })
        store.dispatch(actions.loadNews()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('loadMore function', () => {
        fetchMock.getOnce('https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=5763846de30d489aa867f0711e2b031c&q=singapore&page=3', {
            body: {
                response: {
                    docs: [3,4]
                },
                status: 'OK'
            },
            headers: {
                'content-type': 'application/json'
            }
        })
        const expectedActions = [
            {
                type: types.LOADING_NEWS,
                payload: true
            },
            {
                type: types.SET_PAGE,
                payload: 3
            },
            {
                type: types.SET_QUERY,
                payload: 'singapore'
            },
            {
                type: types.LOADING_NEWS,
                payload: false
            },
            {
                type: types.APPEND_NEWS,
                payload: [3,4]
            },
        ]
        const store = mockStore({
            news: {
                newLists: [],
                page: 2,
                query: 'singapore',
                loading: false
            }
        })
        store.dispatch(actions.loadMore()).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('loadMore failed function', () => {
        fetchMock.getOnce(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=5763846de30d489aa867f0711e2b031c&q=singapore&page=1`, {
            body: 'text',
            headers: {
                'content-type': 'application/json'
            }
        })
        const expectedActions = [
            {
                type: types.LOADING_NEWS,
                payload: true
            },
            {
                type: types.LOADING_NEWS,
                payload: false
            },
        ]
        const store = mockStore({
            news: {
                newLists: [],
                page: 2,
                query: 'singapore',
                loading: false
            }
        })
        store.dispatch(actions.loadMore()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('search function', () => {
        const query = 'singapore'
        fetchMock.getOnce(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=5763846de30d489aa867f0711e2b031c&q=${query}&page=1`, {
            body: {
                response: {
                    docs: [3,4]
                },
                status: 'OK'
            },
            headers: {
                'content-type': 'application/json'
            }
        })
        const expectedActions = [
            {
                type: types.LOADING_NEWS,
                payload: true
            },
            {
                type: types.SET_PAGE,
                payload: 1
            },
            {
                type: types.SET_QUERY,
                payload: query
            },
            {
                type: types.LOADING_NEWS,
                payload: false
            },
            {
                type: types.SET_NEWS,
                payload: [3,4]
            },
        ]
        const store = mockStore({
            news: {
                newLists: [],
                page: 2,
                query: 'singapore',
                loading: false
            }
        })
        store.dispatch(actions.search()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    it('search failed function', () => {
        fetchMock.getOnce(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=5763846de30d489aa867f0711e2b031c&q=singapore&page=1`, {
            body: 'text',
            headers: {
                'content-type': 'application/json'
            }
        })
        const expectedActions = [
            {
                type: types.LOADING_NEWS,
                payload: true
            },
            {
                type: types.LOADING_NEWS,
                payload: false
            },
        ]
        const store = mockStore({
            news: {
                newLists: [],
                page: 2,
                query: 'singapore',
                loading: false
            }
        })
        store.dispatch(actions.search()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

})