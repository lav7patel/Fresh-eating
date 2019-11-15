import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Favorites from "./components/Favorites";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Checkbox from "./components/Checkbox";

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
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/Favorites" component={Favorites} />
        </Switch>
      </Router>
    );
  }
}

export default App;
