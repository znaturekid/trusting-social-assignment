import * as utils from '../../utils';
import fetchMock from 'fetch-mock';

describe('utils', () => {
    afterEach(() => {
        fetchMock.restore()
    })
    it('should return string date as expect Tue Nov 13 2018', () => {
        expect(utils.formatDate('2018-11-13T10:17:52+0000')).toEqual('Tue Nov 13 2018');
    })
    it('should return null', () => {
        expect(utils.formatDate()).toEqual(null);
    })
    it('should return null when list image have no items', () => {
        expect(utils.getFirstImageLink([])).toEqual(null);
    })
    it('should return first url', () => {
        expect(utils.getFirstImageLink([{url: 'link.png'}])).toEqual('https://static01.nyt.com/link.png');
    })
    it('should request correct response', () => {
        const url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=5763846de30d489aa867f0711e2b031c&q=singapore&page=1'
        const response = {
            response: {
                docs: [1,2]
            },
            status: 'OK'
        }
        fetchMock.getOnce(url, { 
            body: response,
            headers: {
                'content-type': 'application/json'
            }
        })
        
        return utils.requestJSON(url, {}).then((value) => {
            expect(value).toEqual(response)
        })
    })

})