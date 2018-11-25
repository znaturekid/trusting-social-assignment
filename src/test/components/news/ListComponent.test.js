import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ListComponent from '../../../components/news/ListComponent'
import 'jest-styled-components';
import { mountWrap } from '../../help';
Enzyme.configure({
    adapter: new Adapter()
})

function setup() {
    const props = {
        list: [{
            source: 'source',
            snippet: 'snippet',
            pub_date: '2018-08-05T21:21:27+0000',
            multimedia: []
        }],
        viewNews: jest.fn(),
        loadNews: jest.fn()
    }

    const component = (<ListComponent { ...props} />)

    return {
        props,
        component
    }
}

describe('components', () => {
    describe('List =>', () => {
        it('should render 1 item', () => {
            const { component, props} = setup()
            const list = mountWrap(component);
            expect(list.find('ItemComponent').length).toBe(1);
            
        })
        it('should call loadNews function', () => {
            const { component, props} = setup()
            const list = mountWrap(component);
            expect(list.find('ItemComponent').length).toBe(1);
            expect(props.loadNews).toBeCalled();
        })

       
    })
})