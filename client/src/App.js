import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import Header from "./components/Header";
import Cities from "./components/Cities";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App" id="container">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/cities" component={Cities} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
