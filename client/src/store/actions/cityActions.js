import {
  FETCH_CITY_SUCCESS,
  FETCH_CITY_ERROR,
  FETCH_CITY_LOADING
} from "./actionTypes";
import Cities from "../../components/Cities";

export const fetchCities = () => {
  return dispatch => {
    dispatch(fetchCitiesLoading());
    fetch("http://localhost:5000/cities/all")
      .then(res => {
        return res.json();
      })
      .then(result => {
        console.log("result", result);
        dispatch(fetchCitiesSuccess(result));
      })
      .catch(error => {
        console.log("Error occured", error);
        dispatch(fetchCitiesError(error));
      });
  };
};

const fetchCitiesSuccess = result => {
  return {
    type: FETCH_CITY_SUCCESS,
    payload: result
  };
};
const fetchCitiesError = error => {
  return {
    type: FETCH_CITY_ERROR,
    payload: error
  };
};

const fetchCitiesLoading = () => {
  return {
    type: FETCH_CITY_LOADING
  };
};
