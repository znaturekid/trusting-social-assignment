import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HomeComponent from '../../../pages/home';
import { mountWrap, shallowWrap } from '../../help';
import configureMockStore from 'redux-mock-store';

import thunk from 'redux-thunk';
import { Provider } from 'react-redux';;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

Enzyme.configure({
    adapter: new Adapter()
});

const store = mockStore({
    news: {
        newLists: [],
        page: 1,
        query: '',
        loading: false
    }
})
const props = {
    
}
const component = (<Provider store={store}><HomeComponent></HomeComponent></Provider>)

describe('components', () => {
    
    describe('Home =>', () => {
        it('should render home correctly', () => {
            const home = shallowWrap(component);
            expect(home).toMatchSnapshot();
        })
    })
})