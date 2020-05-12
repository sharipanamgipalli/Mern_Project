import React, { Component } from "react";
import Cities from "./Cities";
import logo from "./circled-right-2.png";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Login from "./LoginAccount";

export default class Landing extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="page-container">
        <div className="landing-text text-center">
          <p className="">
            Find your perfect trip, designed by insiders who know and love their
            cities
          </p>
          <p className="">Start Browsing</p>
          <Link to="/cities">
            {" "}
            <img className="mx-auto" src={logo} alt="Start browsing" />
          </Link>
        </div>
      </div>
    );
  }
}
