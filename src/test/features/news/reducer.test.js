import reducer from '../../../features/news/reducer';
import * as types from '../../../features/news/types';
describe('news reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            listNews: [],
            page: 1,
            detail: null,
            loading: false,
            query: 'singapore',
        })
    })

    it('should handle APPEND_NEWS', () => {
        expect(
            reducer({
                listNews: [3,4],
            }, {
                type: types.APPEND_NEWS,
                payload: [1,2]
            })
        ).toEqual({
            listNews: [3,4,1,2],
        })
    })

    it('should handle SET_NEWS', () => {
        expect(
            reducer({
                listNews: [3,4],
            }, {
                type: types.SET_NEWS,
                payload: [1,2]
            })
        ).toEqual({
            listNews: [1,2],
        })
    })

    it('should handle VIEW_NEWS', () => {
        expect(
            reducer({
                detail: null
            }, {
                type: types.VIEW_NEWS,
                payload: {
                    source: 'New'
                }
            })
        ).toEqual({
            detail: { source: 'New' }
        })
    })

    it('should handle LOADING_NEWS', () => {
        expect(
            reducer({
                loading: false
            }, {
                type: types.LOADING_NEWS,
                payload: true
            })
        ).toEqual({
            loading: true
        })
    })
    it('should handle SET_PAGE', () => {
        expect(
            reducer({
                page: 1
            }, {
                type: types.SET_PAGE,
                payload: 10
            })
        ).toEqual({
            page: 10
        })
    })
    
    it('should handle SET_QUERY', () => {
        expect(
            reducer({
                query: 'singapore'
            }, {
                type: types.SET_QUERY,
                payload: 'vietnam'
            })
        ).toEqual({
            query: 'vietnam'
        })
    })

})