import React from 'react'
import Enzyme, {
    mount,
    shallow
} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SearchComponent from '../../../components/search'
import toJson from 'enzyme-to-json';
import 'jest-styled-components';

Enzyme.configure({
    adapter: new Adapter()
})

function setup() {
    const props = {
        search: jest.fn(),
        query: 'singapore',
        loading: false
    }

    const component = <SearchComponent { ...props} />

    return {
        props,
        component
    }
}
jest.useFakeTimers();

describe('components', () => {
    describe('Search =>', () => {
        it('should render self and subcomponents', () => {
            const { component } = setup()
            expect(shallow(component)).toMatchSnapshot();
        })

        it('should render input with default value ', () => {
            const { component, props } = setup()
            const search = mount(component);
            const input = search.find('input');
            expect(input).toHaveLength(1);
            expect(search.state().query).toBe(props.query);
        })
        it('should call search function after change event fire', () => {
            const { component, props } = setup()
            const textChange = "vietname";
            const search = mount(component);
            const input = search.find('input');
            input.simulate('focus');
            input.simulate('change', {target: { value: textChange }});
            expect(setTimeout).toHaveBeenCalledTimes(1);
            expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 400);
            jest.runOnlyPendingTimers();
            expect(props.search).toBeCalledWith(textChange);
            input.simulate('change', {target: { value: '' }});
        })
        it('should call search function after keypress event fire with enter key', () => {
            const { component, props } = setup()
            const search = mount(component);
            const input = search.find('input');
            input.simulate('focus');
            input.simulate('keypress', {charCode: 13});
            expect(props.search).toBeCalledWith(props.query);
        })
        it('should not call search function after keypress event fire with any except enter key', () => {
            const { component, props } = setup()
            const search = mount(component);
            const input = search.find('input');
            input.simulate('focus');
            input.simulate('keypress', {charCode: 2});
            expect(props.search).not.toBeCalled();
            input.simulate('change', {target: { value: 'ab' }});
            input.simulate('keypress', {charCode: 13});
        })
    })
})