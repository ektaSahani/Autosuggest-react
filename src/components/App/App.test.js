import React from 'react';
import { shallow, mount } from 'enzyme';
import ConnectedApp, { App } from './App';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { CITIES } from '../../CITIES';
const initialState = {
    filterList: CITIES,
    selectedSuggestion: '',
    showList: false,
    key: '',
    cursor: 0
}

const mockStore = configureMockStore();
const store = mockStore(initialState);

it('renders without crashing', () => {
    shallow(<Provider store={store} ><ConnectedApp /></Provider>);
});

it('should set state on handle change', () => {
    const options = { label: 'Afghanistan', value: 'AF' };
    const mockPropsFn = jest.fn();
    const wrapper = mount(<Provider store={store}><ConnectedApp /></Provider>);

    const app = wrapper.find(App);
    // app.prop('filterList') = mockPropsFn;
    app.instance().handleChange('afganis');
    expect(wrapper.find(ConnectedApp).length).toEqual(1);
    expect(app.prop('state').showList).toBe(initialState.showList);
    // expect(mockPropsFn).toHaveBeenCalled();
    // expect(mockPropsFn).toHaveBeenCalledWith(options);
    // // expect(app.length).toEqual(1)
});

it('should set state on suggestion select', () => {
    const options = { label: 'Afghanistan', value: 'AF' };
    const mockPropsFn = jest.fn();
    const app = shallow(<Provider store={store} ><App /></Provider>);
    app.instance().filterOptions = mockPropsFn;
    app.instance().onSuggestionSelect(options);
    expect(app.state().selectedSuggestion).toEqual(options.label);
    expect(app.state().showList).toEqual(false);
    expect(app.state().key).toEqual(options.value);
    expect(app.state().cursor).toEqual(0);
    expect(mockPropsFn).toHaveBeenCalled();
    expect(mockPropsFn).toHaveBeenCalledWith(options.label);
});

it('should set state on suggestion select', () => {
    const app = shallow(<Provider store={store} ><App /></Provider>);
    app.instance().onInputFocus();
    expect(app.state().showList).toEqual(true);
});

it('should set state on suggestion select', () => {
    const options = [{ label: 'Afghanistan', value: 'AF' }];
    const app = shallow(<Provider store={store} ><App /></Provider>);
    app.instance().filterOptions('AFghan');
    expect(app.state().options).toEqual(options);
});

it('should set cursor state on down arrow', () => {
    const e = { keyCode: 38 };
    const app = shallow(<Provider store={store} ><App /></Provider>);
    app.state().cursor = 3;
    app.instance().navigateThroughKeys(e);
    expect(app.state().cursor).toEqual(2);
});

it('should set cursor state on up arrow', () => {
    const e = { keyCode: 40 };
    const app = shallow(<Provider store={store} ><App /></Provider>);
    app.state().cursor = 3;
    app.instance().navigateThroughKeys(e);
    expect(app.state().cursor).toEqual(4);
});

it('should set selected option in input', () => {
    const e = { keyCode: 13 };
    const app = shallow(<Provider store={store} ><App /></Provider>);
    const mockPropsFn = jest.fn();
    app.instance().onSuggestionSelect = mockPropsFn;
    app.instance().navigateThroughKeys(e);
    expect(mockPropsFn).toHaveBeenCalled();

})