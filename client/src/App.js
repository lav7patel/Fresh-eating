import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import API from "./utils/API.js";

class App extends Component {
  /*  componentDidMount() {
    API.search("lasagna", "vegan", "peanut")
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  } */
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
