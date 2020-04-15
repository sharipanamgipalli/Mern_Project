import React, { Component } from "react";
import { useLayoutEffect } from "react";
import { connect } from "react-redux";
import { postUserDetails } from "../store/actions/newAccountActions";

class CreateAccount extends Component {
  constructor(props) {
    super();
    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      picture: null,
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
  };

  componentDidMount() {}

  render() {
    const { firstName, lastName, email, password, picture } = this.state;

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };

    return (
      <div className="account-container row d-flex">
        <form onSubmit={this.handleSubmit}>
          <div className="p-2 col-12">
            <h2>Create Account</h2>
            <div className="fname form-group">
              <label for="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                className="form-control"
                placeholder="Enter your first name"
                onChange={this.handleUserDetails}
                required
              />
            </div>
          </div>
          <div className="p-2 col-12">
            <div className="lname form-group">
              <label for="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={lastName}
                className="form-control"
                placeholder="Enter your last name"
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
                type="file"
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
    myPosting: state.myUserDetails.isPosting,
    myError: state.myUserDetails.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    postUserDetails: () => {
      dispatch(postUserDetails());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
