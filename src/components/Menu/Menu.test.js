import React from 'react';
import { configure, shallow } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';
import Adapter from "enzyme-adapter-react-16";

import Menu from "./Menu";
import MenuElement from "./MenuElement/MenuElement";

configure({adapter: new Adapter()})

describe('<Menu />', () => {
  it('should render one active item on login', () => {
    const wrapper = shallow(<Menu />)
    expect(wrapper.find(MenuElement)).toHaveLenth(2)
  })
});