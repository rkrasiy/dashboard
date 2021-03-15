import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import Footer from "../components/Footer/Footer";
import Content from "./Content/Content";
import Auth from "./Auth/Auth";
import Header from "../components/Header/Header";
import Logout from "../containers/Auth/Logout/Logout"
class App extends Component {
  render() {
    
    /*let main = null;
    if (!this.state.isLogged)
      main = <Content />
    else
      main = <Auth isLogged={this.state.isLogged} />
   */
  
    return (
        <div className="App">
          <Header 
            isAuth={this.props.isAuthenticated}
          />
          <main>
          <Switch>
            <Route path="/dashboard" exact component={Content} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/" exact component={Auth} />
          </Switch>
          </main>
          <Footer
            link="https://www.linkedin.com/in/ruslan-krasiy-b7566016a/"
            linktitle="LinkedIn/ruslan-krasiy"
          >
            @Ruslan Krasiy
          </Footer>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.userId !== null
  }
}

export default connect( mapStateToProps)(App);
