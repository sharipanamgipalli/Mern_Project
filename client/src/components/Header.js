import React, { Component } from "react";

import SideDrawerButton from "./SideDrawerButton";

const toolbar = (props) => (
  <div className="navbar">
    <nav className="navbar_navigation">
      <div>
        <SideDrawerButton click={props.drawerToggleHandler} />
      </div>
      <div className="navbar_logo">
        <a href="/">MY ITINERARY APP</a>
      </div>

      <div className="avatar">
        <img src={props.imageProps} width="60" height="60" />
      </div>
    </nav>
  </div>
);
export default toolbar;
