import React, { Component } from "react";
import logo1 from "./travel-5.jpg";

export default class Header extends Component {
  render() {
    return (
      <React-Fragment>
        <div className="header">
          <i className="fa fa-user fa-2x user"></i>
          <p>My Itinerary</p>
          <i className="fa fa-align-justify fa-2x align"></i>
        </div>

        <div className="container-img">
          <img
            src={logo1}
            alt={"Itinerary Logo"}
            style={{ width: "100%", height: "auto" }}
          />
          <div className="content">
            <p>To travel is to live!</p>
          </div>
        </div>
      </React-Fragment>
    );
  }
}
