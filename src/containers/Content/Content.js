import React, { Component } from "react";
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

    if(this.state.menu[0].active)
      contentList = <Clients />
    if(this.state.menu[1].active)
      contentList = <Products />
    return (
      <div className="Content">
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

export default Content;
