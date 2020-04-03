import React, { Component } from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { fetchItineraries } from "../store/actions/itineraryActions";

class Itineraries extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    //in the props we have access to both redux store and redux actions (only the ones remaped in mapStateToProps and mapDispatchToProps)
    console.log("itinerary props", this.props);
    const cityName = this.props.match.params.cityName;
    this.props.fetchItineraries(cityName);
  }
  render() {
    return (
      <div className="city-itinerary">
        <p>itinerary page</p>
        {/* <button
          type="button"
          className="btn btn-secondary"
          onClick={this.props.fetchItineraries}
        >
          View City Itinerary
        </button> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    myItineraries: state.myItineraries.itineraries,
    myLoading: state.myItineraries.isLoading,
    myError: state.myItineraries.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchItineraries: cityName => {
      dispatch(fetchItineraries(cityName));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Itineraries);
