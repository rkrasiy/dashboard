import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Menu from "../../components/Menu/Menu";
import Clients from "../Clients/Clients";
import Products from "../Products/Products"
import "./Content.css";


class Content extends Component {
  state = {
    menu: [
      {
        id: "itm-1",
        titleElement: "Clientes",
        active: true
      },
      {
        id: "itm-2",
        titleElement: "Productos",
        active: false
      }
    ]
  };

 clickMenuItemHandler = (id) => {
    let menu = [...this.state.menu]
    let newMenu = [...menu.map( el => {
      if(el.id === id){
        el.active = true
      }else{
        el.active = false
      }
      return el
    })]

    this.setState({menu: newMenu})
 }
 
  render() {
    let contentList = "";
    let authRedirect = null;
    if(!this.props.isAuth){
      authRedirect = <Redirect to="/" exact/>
    }
    if(this.state.menu[0].active)
      contentList = <Clients />
    if(this.state.menu[1].active)
      contentList = <Products />
    return (
      <div className="Content">
        {authRedirect}
        <aside>
          <Menu 
            child={this.state.menu} 
            clicked={this.clickMenuItemHandler}
          />
        </aside>
        <section>
          {contentList}
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.userId !== null,
  };
};

export default connect(mapStateToProps)(Content);
