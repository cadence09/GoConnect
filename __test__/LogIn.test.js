import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';


import LogIn from '../src/screens/LogIn';

describe('render <Login />', () => {
  const container = shallow(<LogIn />);
  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot();
  });

  it('should have an email field', () => {
    expect(container.find('TextInput')).toBeTruthy();
  });
});
