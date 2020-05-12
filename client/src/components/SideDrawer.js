import React from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

const sideDrawer = (props) => {
  let drawerClasses = "side-drawer";
  if (props.show) {
    drawerClasses = "side-drawer open ";
  }
  return (
    <nav className={drawerClasses}>
      <ul>
        <Link to="/register">
          <li>
            <a href="">New User?</a>
          </li>
        </Link>
        <Link to="/login">
          <li>
            <a href="">Log In</a>
          </li>
        </Link>
        <li>
          <a href="">Favourites</a>
        </li>
        <Link to="/logout">
          <li>
            <a href="">Log Out</a>
          </li>
        </Link>
      </ul>
    </nav>
  );
};
export default sideDrawer;
