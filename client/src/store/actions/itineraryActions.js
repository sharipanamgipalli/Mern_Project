import {
  FETCH_ITINERARY_LOADING,
  FETCH_ITINERARY_SUCCESS,
  FETCH_ITINERARY_ERROR
} from "./actionTypes";
import Itineraries from "../../components/Itineraries";

export const fetchItineraries = cityName => {
  return dispatch => {
    dispatch(fetchItineraryLoading());
    fetch("http://localhost:5000/itineraries/" + cityName)
      .then(res => res.json())
      .then(result => {
        console.log("result", result);
        dispatch(fetchItinerarySuccess(result));
      })
      .then(error => {
        console.log("error", error);
        dispatch(fetchItineraryError(error));
      });
  };
};

const fetchItineraryLoading = () => {
  return {
    type: FETCH_ITINERARY_LOADING
  };
};
const fetchItinerarySuccess = result => {
  return {
    type: FETCH_ITINERARY_SUCCESS,
    payload: result
  };
};
const fetchItineraryError = error => {
  return {
    type: FETCH_ITINERARY_ERROR,
    payload: error
  };
};
