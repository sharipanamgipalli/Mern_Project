import React, { Component } from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCities } from "../store/actions/cityActions";
import { FETCH_CITY_LOADING } from "../store/actions/actionTypes";
import Itineraries from "./Itineraries";

class Cities extends Component {
  constructor(props) {
    super(props);
    // this.cityInfoDisplay = this.cityInfoDisplay.bind(this);
    this.state = {
      cities: [],
      filteredCities: [],
      search: "",
      isDisplaying: false
    };
  }
  componentDidMount() {
    //in the props we have access to both redux store and redux actions (only the ones remaped in mapStateToProps and mapDispatchToProps)
    console.log(this.props);

    this.props.fetchCities();
    const { filteredCities } = this.props.myCities;
    console.log("filtered cities", filteredCities);
    // this.getCities();
  }
  // getCities = () => {};
  cityInfoDisplay = e => {
    {
      this.setState({ isDisplaying: !this.state.isDisplaying });
    }
    console.log("function called");
  };
  handleSearchFilter = e => {
    this.setState({ search: e.target.value });
    console.log(e.target.value);
    let filteredArr = [];
    this.props.myCities.map(city => {
      if (city.name.toLowerCase().includes(this.state.search.toLowerCase())) {
        filteredArr.push(city);
      }
      this.setState({ filteredCities: filteredArr });
    });
    console.log(filteredArr);
  };

  render() {
    return (
      <div className="city-container">
        <div className="row d-flex">
          <div className="p-2 col-12">
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search for Cities.."
                aria-label="Search"
                id="searchField"
                onChange={this.handleSearchFilter}
              />
            </form>
          </div>
          <div className="p-2 col-12">
            {this.props.myCities.map((city, index) => {
              return (
                <div className="city-img">
                  <img
                    src={city.img}
                    onClick={this.cityInfoDisplay}
                    key={index}
                  />

                  {this.state.isDisplaying && (
                    <div className="city-details">
                      <div className="city-name">
                        <p>{city.name}</p>
                      </div>
                      <div className="city-country">
                        <p>{city.country}</p>
                      </div>

                      <Itineraries />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="home-icon">
          <Link to="/">
            <i className="fa fa-home fa-2x"></i>
          </Link>
        </div>
      </div>
    );
  }
}
//access and remap redux store (even before action gets dispatched, meaning my state will be = to intial state in reducer)
const mapStateToProps = state => {
  console.log("state", state);
  return {
    myCities: state.myCities.cities,
    myError: state.myCities.error,
    myFetching: state.myCities.isFetching
    // mySearchedCities: state.myCities.searchCities

    //add an animation to this myFetching prop
  };
};
//access and remap redux actions
const mapDispatchToProps = dispatch => {
  return {
    fetchCities: () => {
      dispatch(fetchCities());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cities);
