import React from 'react';
import { shallow} from 'enzyme';

import Menu from "./Menu";
import MenuElement from "./MenuElement/MenuElement";

describe('<Menu />', () => {
  let wrapper
  beforeEach( () =>{
    wrapper = shallow(<Menu debug/>)
  })

  it('should render correctly with no props', () => {
    expect(wrapper).toMatchSnapshot();
  });

  /*it('should render two <MenuItems /> elements', () => {

    wrapper.setProps({child: child})
    expect(wrapper.find(MenuElement)).toHaveLength(2);
  });
*/
});