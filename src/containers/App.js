import React, { Component } from "react";
import "./App.css";
import Footer from "../components/Footer/Footer";
import Content from "./Content/Content";
import Auth from "./Auth/Auth";
import Header from "../components/Header/Header";

class App extends Component {
  state = {
    isLogged: true,
  };

  render() {
    let main = null;
    if (this.state.isLogged)
      main = <Content />
    else
      main = <Auth isLogged={this.state.isLogged} />
   
    return (
        <div className="App">
          <Header />
          <main>
            {main}
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

export default App;
