import React from 'react';
import { shallow} from 'enzyme';

import Header from "./Header";
import { NavLink } from 'react-router-dom';
describe('<Header />', () => {
  let wrapper
  beforeEach( () =>{
    wrapper = shallow(<Header/>)
  })

  it('should render "user-name" when is authentificated', () => {
    wrapper.setProps({userName: "testName"})
    expect(wrapper.find(".user-name")).toHaveLength(1);
  });

  it('should render "Logout button" when is authentificated', () => {

    wrapper.setProps({isAuth: true})
    expect(wrapper.contains(<NavLink to="/logout" exact>Logout</NavLink>)).toEqual(true);
  });
  
});