import { FETCH_CITY_SUCCESS } from "./actionTypes";
import Cities from "../../components/Cities";

export const fetchCities = () => {
  return {
    type: FETCH_CITY_SUCCESS,
    payload: fetch("http://localhost:5000/cities/all")

    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(result => {
    //     return {
    //       type: FETCH_CITY_SUCCESS,
    //       payload: Cities
    //     };
    //   })
    //   .then(result => {
    //     this.setState({ cities: result });
    //     console.log(this.state.cities);
    //     this.setState({ filteredCities: result });
    //   })
    //   .catch(error => {
    //     console.log("Error occured", error);
    //   })
  };
};
