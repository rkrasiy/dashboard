import React from 'react';
import { shallow} from 'enzyme';

import {Products} from "./Products"
import Product from "../../components/Product/Product";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Modal from "../../components/Modal/Modal";

import Spinner from "../../components/Spinner/Spinner";


describe ("<Products />", () => {
  let wrapper;
  wrapper = shallow(<Products />);

  it("shout render <Spiner /> while is data loading", ()=>{
    wrapper.setProps({loading: true})
    expect(wrapper.contains(<Spinner />)).toEqual(true);
  })

})