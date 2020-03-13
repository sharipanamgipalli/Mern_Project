import React from "react";
import Header from "./Header";
import Cities from "./Cities";
import logo from "./circled-right-2.png";
import CreateItinerary from "./CreateItinerary";
import Login from "./Login";
import CreateAccount from "./CreateAccount";

export default function Landing() {
  return (
    <div>
      <Header />
      <div className="landing-text text-center">
        <p className="">
          Find your perfect trip, designed by insiders who know and love their
          cities
        </p>
        <p className="">Start Browsing</p>
        <img className="mx-auto" src={logo} alt="Start browsing" />
      </div>

      <div className="row d-flex">
        <div className="col-12"></div>
      </div>
      <div className="row d-flex">
        <div className="col-12">New York</div>
      </div>
      <div className="row d-flex">
        <div className="col-12">Amsterdam</div>
      </div>
      <div className="row d-flex">
        <div className="col-12">Paris</div>
      </div>
    </div>
  );
}
