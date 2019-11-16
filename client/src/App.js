import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Favorites from "./components/Favorites";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Search from "./components/Search";

class App extends Component {
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
