import React, { Component } from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";

export default class Cities extends Component {
  constructor() {
    super();
    this.cityInfoDisplay = this.cityInfoDisplay.bind(this);
    this.state = {
      cities: [],
      filteredCities: [],
      search: "",
      isDisplaying: false
    };
  }
  componentDidMount() {
    this.getCities();
  }
  getCities = () => {
    fetch("http://localhost:5000/cities/all")
      .then(res => {
        return res.json();
      })
      .then(result => {
        this.setState({ cities: result });
        console.log(this.state.cities);
        this.setState({ filteredCities: result });
      })
      .catch(error => {
        console.log("Error occured", error);
      });
  };
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
    this.state.cities.map(city => {
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
            {this.state.filteredCities.map(city => {
              return (
                <div className="city-img">
                  <img src={city.img} onClick={this.cityInfoDisplay} />

                  {this.state.isDisplaying && (
                    <div className="city-details">
                      <div className="city-name">
                        <p>{city.name}</p>
                      </div>
                      <div className="city-country">
                        <p>{city.country}</p>
                      </div>
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
