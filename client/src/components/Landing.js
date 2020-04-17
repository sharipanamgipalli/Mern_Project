import React, { Component } from "react";
import Header from "./Header";
import Cities from "./Cities";
import logo from "./circled-right-2.png";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import SideDrawer from "./SideDrawer";
import Backdrop from "./Backdrop";
import image from "./travel-5.jpg";

import Login from "./LoginAccount";

export default class Landing extends Component {
  constructor() {
    super();
    this.state = {
      isDrawerOpen: false
    };
  }

  drawerToggleHandler = () => {
    this.setState(prevState => {
      return { isDrawerOpen: !prevState.isDrawerOpen };
    });
  };
  backdropCloseHandler = () => {
    this.setState({ isDrawerOpen: false });
  };

  render() {
    let backdrop;
    if (this.state.isDrawerOpen) {
      backdrop = <Backdrop click={this.backdropCloseHandler} />;
    }
    return (
      <div className="page-container">
        <Header drawerToggleHandler={this.drawerToggleHandler} />
        <SideDrawer show={this.state.isDrawerOpen} />
        {backdrop}
        {/* <img src={image} alt="Backgroung image" width="100%" height="100%" /> */}
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
