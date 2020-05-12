import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import Header from "./components/Header";
import Cities from "./components/Cities";
import Itineraries from "./components/Itineraries";
import CreateAccount from "./components/CreateAccount";
import LoginAccount from "./components/LoginAccount";
import LogoutAccount from "./components/LogoutAccount";
import SideDrawer from "./components/SideDrawer";
import Backdrop from "./components/Backdrop";
import { connect } from "react-redux";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      isDrawerOpen: false,
    };
  }
  drawerToggleHandler = () => {
    this.setState((prevState) => {
      return { isDrawerOpen: !prevState.isDrawerOpen };
    });
  };
  backdropCloseHandler = () => {
    this.setState({ isDrawerOpen: false });
  };
  render() {
    let backdrop;
    if (this.state.isDrawerOpen) {
      backdrop = <Backdrop click={this.backdropCloseHandler} />;
    }
    const imageProps = this.props.myLoginDetails.loggedInUser.picture;
    // console.log("imageProps", imageProps);
    return (
      <BrowserRouter>
        <div className="App" id="container">
          <Header
            drawerToggleHandler={this.drawerToggleHandler}
            imageProps={imageProps}
          />
          <SideDrawer show={this.state.isDrawerOpen} />
          {backdrop}
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/cities" component={Cities} />
            <Route path="/:cityName/itineraries" component={Itineraries} />
            <Route path="/register" component={CreateAccount} />
            <Route path="/login" component={LoginAccount} />
            <Route path="/logout" component={LogoutAccount} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    myLoginDetails: state.myLoginDetails,
  };
};
export default connect(mapStateToProps)(App);
