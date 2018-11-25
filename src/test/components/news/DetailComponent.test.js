import React from 'react';
import Enzyme, {mount} from 'enzyme';
import { formatDate } from '../../../utils';
import Adapter from 'enzyme-adapter-react-16'
import DetailComponent from '../../../components/news/DetailComponent'
import 'jest-styled-components';
import { mountWrap } from '../../help'
Enzyme.configure({
    adapter: new Adapter()
});

function setup() {
    const props = {
        detail: {
            source: 'source',
            snippet: 'snippet',
            pub_date: '2018-08-05T21:21:27+0000',
            multimedia: []
        },
    }

    const component = (<DetailComponent { ...props} />)
    const componentWithoutProps = (<DetailComponent detail={null} />)

    return {
        props,
        component,
        componentWithoutProps
    }
}

describe('components', () => {
    describe('Detail =>', () => {
        it('should render detail', () => {
            const { component, props} = setup()
            const list = mountWrap(component);
            expect(list.find('p').at(1).text()).toBe(props.detail.snippet);
            expect(list.find('p').at(0).text()).toBe(`From ${props.detail.source} on ${formatDate(props.detail.pub_date)}`);
            
        })

        it('should render empty section', () => {
            const { componentWithoutProps, props} = setup()
            const list = mountWrap(componentWithoutProps);
            expect(list.find('div').at(0).text()).toBe('There are no content.Go back Home Page!');
            
        })
    })
})