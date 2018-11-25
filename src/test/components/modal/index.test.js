import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ModalComponent from '../../../components/modal';
import { mountWrap } from '../../help';

Enzyme.configure({
    adapter: new Adapter()
});

const component = (<ModalComponent><div>chirren</div></ModalComponent>)

beforeAll(() => {
    const div = document.createElement('div');
    div.setAttribute('id', 'modal')
    document.body.appendChild(div);
})
describe('components', () => {
    
    describe('Modal =>', () => {
        it('should render modal correctly', () => {
            const list = mountWrap(component);
            const button = list.find('button')
            expect(button.hasClass('close-modal')).toBe(true);
            button.simulate('click');
            
        })
    })
})