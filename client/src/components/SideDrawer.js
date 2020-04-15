import React from "react";

const sideDrawer = props => {
  let drawerClasses = "side-drawer";
  if (props.show) {
    drawerClasses = "side-drawer open";
  }
  return (
    <nav className={drawerClasses}>
      <ul>
        <li>
          <a href="">New User?</a>
        </li>

        <li>
          <a href="">Log In</a>
        </li>

        <li>
          <a href="">Favourites</a>
        </li>
        <li>
          <a href="">Log Out</a>
        </li>
      </ul>
    </nav>
  );
};
export default sideDrawer;
