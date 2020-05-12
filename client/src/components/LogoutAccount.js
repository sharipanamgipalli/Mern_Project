import React, { Component } from "react";
import { useLayoutEffect } from "react";
import { connect } from "react-redux";
import {
  Route,
  Link,
  BrowserRouter,
  Redirect as Router,
  Redirect,
} from "react-router-dom";
import { logoutUser } from "../store/actions/loginActions";

class LogoutAccount extends Component {
  componentDidMount() {
    this.props.logoutUser();
  }

  render() {
    if (this.props.myLogoutUser.isLoggedOut) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="logout-container">
        <h2>Logged out Successfully.</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    myLogoutUser: state.myLogoutUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => {
      dispatch(logoutUser());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LogoutAccount);
