import React from 'react'
import Enzyme, {
    mount,
} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PaginationComponent from '../../../components/pagination'
import 'jest-styled-components';

Enzyme.configure({
    adapter: new Adapter()
})

function setup() {
    const props = {
        nextPage: jest.fn(),
        page: 1,
        loading: false
    }

    const component = <PaginationComponent { ...props} />

    return {
        props,
        component
    }
}


function setupWithProps(customProps) {
    const props = {
        nextPage: jest.fn(),
        page: 1,
        loading: false,
        ...customProps
    }

    const component = <PaginationComponent { ...props} />

    return {
        props,
        component
    }
}


describe('components', () => {
    describe('pagination =>', () => {
        it('should render self and subcomponents', () => {
            const { component } = setup()
            expect(mount(component).text()).toBe('Load More');
        })

        it('should call search function after change event fire', () => {
            const { component, props } = setup()
            const button = mount(component);
            button.simulate('click');
            expect(props.nextPage).toBeCalled();
            expect(button.state().autoScroll).toBe(true)
        })

        it('should render button with loading text', () => {
            const { component } = setupWithProps({loading:true})
            expect(mount(component).text()).toBe('Loading...');
        })

        it('should render button with loading text', () => {
            const { component } = setupWithProps({page:200})
            expect(mount(component).text()).toBe('No More');
        })
    })
})