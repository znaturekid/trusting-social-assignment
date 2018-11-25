import React from 'react';
import Enzyme from 'enzyme';
import { formatDate } from '../../../utils';
import Adapter from 'enzyme-adapter-react-16'
import ItemComponent from '../../../components/news/ItemComponent'
import 'jest-styled-components';
import { mountWrap } from '../../help';
Enzyme.configure({
    adapter: new Adapter()
});

function setup() {
    const props = {
        item: {
            source: 'source',
            snippet: 'snippet',
            pub_date: '2018-08-05T21:21:27+0000',
            multimedia: [{url: 'link.png'}]
        },
        onClick: jest.fn(),
    }

    const component = (<ItemComponent { ...props} />)

    return {
        props,
        component
    }
}

describe('components', () => {
    describe('Item =>', () => {
        it('should render item', () => {
            const { component, props} = setup()
            const list = mountWrap(component);
            expect(list.find('p').text()).toBe(props.item.snippet);
            expect(list.find('span').at(0).text()).toBe(formatDate(props.item.pub_date));
            expect(list.find('span').at(1).text()).toBe(props.item.source);
            list.simulate('click');
            expect(props.onClick).toBeCalledWith(props.item);
        })

        it('should call onClick when click on the item', () => {
            const { component, props} = setup()
            const list = mountWrap(component);
            list.simulate('click');
            expect(props.onClick).toBeCalledWith(props.item);
        })
    })
})