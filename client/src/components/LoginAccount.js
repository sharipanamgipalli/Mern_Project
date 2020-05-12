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
import CreateAccount from "./CreateAccount";
import { postLoginDetails } from "../store/actions/loginActions";
import { GoogleLoginButton } from "react-social-login-buttons";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import Cities from "./Cities";

class LoginAccount extends Component {
  constructor(props) {
    super();
    this.state = {
      email: null,
      password: null,
    };
  }
  handleUserDetails = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };
  handleLoginSubmit = (e) => {
    e.preventDefault();
    const loggedInUser = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.postLoginDetails(loggedInUser);
  };
  componentDidMount() {
    console.log("login props", this.props);
  }

  render() {
    const { email, password } = this.state;
    const token = this.props.myLoginDetails.token;
    if (this.props.myLoginDetails.isLogged) {
      return <Redirect to={`/cities?token=${token}`} />;
    }

    return (
      <div className="login-container ">
        <form onSubmit={this.handleLoginSubmit}>
          <div className="p-2 col-sm-10">
            <h2>Log In</h2>

            <div className="email_Id form-group">
              <label for="email">Contact Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                className="form-control"
                placeholder="Enter your Email Id"
                onChange={this.handleUserDetails}
                required
              />
            </div>
          </div>
          <div className="p-2 col-sm-10">
            <div className="password form-group">
              <label for="password">Enter your Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                className="form-control"
                placeholder="Password"
                minlength="8"
                onChange={this.handleUserDetails}
                required
              />
            </div>
          </div>
          <div className="p-2">
            <div className="submit form-group">
              <button
                className="form-control  btn btn-lg btn-dark btn-block"
                value="submit"
              >
                Log In
              </button>
            </div>
          </div>
          <div className="text-center pt-3">
            Or continue with your social account
          </div>
        </form>
        <div className="col-sm-offset-2 col-sm-10 align-items-center">
          <Button href="http://localhost:5000/user/auth/google" color="danger">
            <FontAwesomeIcon icon={faGoogle} className="mr-2" />
            Sign In With Google
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    myLoginDetails: state.myLoginDetails,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    postLoginDetails: (loggedInUser) => {
      dispatch(postLoginDetails(loggedInUser));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginAccount);
