import React, { Component } from "react";
import logo1 from "./travel-5.jpg";
import SideDrawerButton from "./SideDrawerButton";

const toolbar = props => (
  <div className="navbar">
    <nav className="navbar_navigation">
      <div>
        <SideDrawerButton click={props.drawerToggleHandler} />
      </div>
      <div className="navbar_logo">
        <a href="/">MY ITINERARY APP</a>
      </div>
    </nav>
  </div>
);
export default toolbar;
