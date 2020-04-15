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
      <div className="itinerary-container">
        <div className="row d-flex">
          <div className="p-2 col-12">
            {this.props.myItineraries.map(itinerary => {
              return (
                <div className="itinerary-img">
                  <img src={itinerary.img} alt=" City itinerary image" />

                  <div className="itinerary-details">
                    <p>{itinerary.title}</p>
                    <p>CITY:{itinerary.city}</p>
                    <p>WHAT YOU DO:{itinerary.summary}</p>
                    <p>DURATION:{itinerary.duration}</p>
                    <p>PRICE:{itinerary.price}</p>
                    <p>RATING:{itinerary.rating}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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
