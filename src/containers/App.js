import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import Footer from "../components/Footer/Footer";
import Content from "./Content/Content";
import Auth from "./Auth/Auth";
import Header from "../components/Header/Header";
import Logout from "../containers/Auth/Logout/Logout";
import * as actions from "../store/actions/index";

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSign()
  }
  render() {
 
    return (
        <div className="App">
          <Header 
            isAuth={this.props.isAuthenticated}
            userName={this.props.userName}
          />
          <main>
          <Switch>
            <Route path="/dashboard" component={Content} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={Auth} />
            <Redirect to="/" />
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
    isAuthenticated: state.auth.userId !== null,
    userName : state.auth.userName
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSign: () => dispatch(actions.authCheckState())
  }
}
export default withRouter(connect( mapStateToProps, mapDispatchToProps)(App));
