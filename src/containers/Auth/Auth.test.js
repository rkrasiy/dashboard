import React from 'react';
import { shallow} from 'enzyme';

import { Auth } from "./Auth";
import { Redirect } from "react-router-dom";

import Input from "../../components/Input/Input";
import Spinner from "../../components/Spinner/Spinner";


describe ("<Auth />", () => {
  let wrapper;
  wrapper = shallow(<Auth />);

  it("shout render <Input /> when not authentificated", ()=>{
    wrapper.setProps({isAuthenticated: false})
    expect(wrapper.find(Input)).toHaveLength(2)
  })

  it("shout render messageError when not authentificated and auth.request is fail", ()=>{
    wrapper.setProps({error: "test error",isAuthenticated: false})
    expect(wrapper.find(".message-error")).toHaveLength(1)
  })

  it("shout render redirect link after saccessfull authentification", ()=>{
    wrapper.setProps({isAuthenticated: true})
    expect(wrapper.contains(<Redirect to="/dashboard" />)).toEqual(true);
  })

  it("shout render <Spiner /> while authentificating", ()=>{
    wrapper.setProps({loading: true})
    expect(wrapper.contains(<Spinner />)).toEqual(true);
  })

})