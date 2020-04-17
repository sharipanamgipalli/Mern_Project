import React, { Component } from "react";
import { useLayoutEffect } from "react";
import { connect } from "react-redux";
import CreateAccount from "./CreateAccount";

export default class LoginAccount extends Component {
  constructor(props) {
    super();
    this.state = {
      email: null,
      password: null,
    };
  }
  render() {
    const { email, password } = this.state;
    return (
      <div className="login-container">
        <form onSubmit={this.handleSubmit}>
          <div className="p-2 col-12">
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
          <div className="p-2">
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
              <input type="submit" className="form-control" value="submit" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
