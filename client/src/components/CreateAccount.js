import React, { Component } from "react";
import { useLayoutEffect } from "react";
import { connect } from "react-redux";
import { postUserDetails } from "../store/actions/newAccountActions";
import {
  Route,
  Link,
  BrowserRouter,
  Redirect as Router,
  Redirect,
} from "react-router-dom";

class CreateAccount extends Component {
  constructor(props) {
    super();
    this.state = {
      userName: null,
      email: null,
      password: null,
      avatarPicture: null,
    };
  }
  handleUserDetails = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    const newUser = {
      userName: this.state.userName,
      email: this.state.email,
      password: this.state.password,
      avatarPicture: this.state.avatarPicture,
    };
    this.props.postUserDetails(newUser);
  };

  componentDidMount() {
    console.log("user props", this.props);

    // const newUser = this.props.match.params.newUser;
  }

  render() {
    const { userName, email, password, picture } = this.state;
    if (this.props.myUserDetails.isPosting) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="account-container">
        <form onSubmit={this.handleSubmit} className="form-container ">
          <div className="p-2 col-12">
            <a href="/">return</a>
            <h2>Create Account</h2>
            <div className="fname form-group">
              <label for="userName">Username</label>
              <input
                type="text"
                name="userName"
                id="userName"
                value={userName}
                className="form-control"
                placeholder="Enter your Username"
                onChange={this.handleUserDetails}
                required
              />
            </div>
          </div>

          <div className="p-2 col-12">
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
          <div className="p-2 col-12">
            <div className="password form-group">
              <label for="password">
                Create Password(8 characters minimum)
              </label>
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

          <div className="p-2 col-12">
            <div className="picture form-group">
              <label for="picture">Upload a picture</label>
              <input
                type="picture"
                name="picture"
                id="picture"
                value={picture}
                onChange={this.handleUserDetails}
                required
              />
            </div>
          </div>
          <div className="p-2 col-12">
            <div className="submit form-group">
              <input type="submit" className="form-control" value="submit" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    myUserDetails: state.myUserDetails.newUser,
    /*  myPosting: state.myUserDetails.isPosting,
    myError: state.myUserDetails.error, */
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    postUserDetails: (newUser) => {
      dispatch(postUserDetails(newUser));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
