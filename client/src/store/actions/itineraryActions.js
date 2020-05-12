import {
  FETCH_ITINERARY_LOADING,
  FETCH_ITINERARY_SUCCESS,
  FETCH_ITINERARY_ERROR,
  ADD_USER_FAVOURITE_ITINERARY,
  DELETE_USER_FAVOURITE_ITINERARY,
  POST_COMMENT_ITINERARY,
  DELETE_COMMENT_ITINERARY,
} from "./actionTypes";
import Itineraries from "../../components/Itineraries";
import axios from "axios";

export const fetchItineraries = (cityName) => {
  return (dispatch) => {
    dispatch(fetchItineraryLoading());
    fetch("http://localhost:5000/itineraries/" + cityName)
      .then((res) => res.json())
      .then((result) => {
        console.log("result", result);
        dispatch(fetchItinerarySuccess(result));
      })
      .then((error) => {
        console.log("error", error);
        dispatch(fetchItineraryError(error));
      });
  };
};

export const fetchFavouriteItinerary = (id, emailofUser, title) => {
  return (dispatch) => {
    axios
      .post(`http://localhost:5000/itineraries/${title}`, {
        email: emailofUser,
        id: id,
      })
      .then((result) => {
        console.log("result", result);
        //dispatch the action to the reducer and the reducer updates data.
        dispatch({
          type: ADD_USER_FAVOURITE_ITINERARY,
          payload: result.data,
        });
        //to refresh the itinerary data in the page we need to send the function again.
        dispatch(fetchItineraries(result.data.itinerary.city));
      })
      .catch((error) => {
        console.log("error", error.response);
      });
  };
};
export const deleteFavouriteItinerary = (id, emailofUser, title) => {
  return (dispatch) => {
    axios
      .post(`http://localhost:5000/itineraries/delete/${title}`, {
        email: emailofUser,
        id: id,
      })
      .then((result) => {
        console.log("result", result);
        dispatch({
          type: DELETE_USER_FAVOURITE_ITINERARY,
          payload: result.data,
        });
        dispatch(fetchItineraries(result.data.itinerary.city));
      })
      .catch((error) => {
        console.log("error", error.response);
      });
  };
};

export const postUserComment = (id, comment, email) => {
  return (dispatch) => {
    axios
      .post(`http://localhost:5000/itineraries/post/${id}/comments`, {
        comment: comment,
        email: email,
      })
      .then((result) => {
        console.log("result", result);
        dispatch({
          type: POST_COMMENT_ITINERARY,
          payload: result.data,
        });
        dispatch(fetchItineraries(result.data.itinerary.city));
      })
      .catch((error) => {
        console.log("error", error.response);
      });
  };
};

export const deleteUserComment = (id, comment, email) => {
  return (dispatch) => {
    axios
      .post(`http://localhost:5000/itineraries/delete/${id}/comments`, {
        comment: comment,
        email: email,
      })
      .then((result) => {
        console.log("result", result);
        dispatch({
          type: DELETE_COMMENT_ITINERARY,
          payload: result.data,
        });
        dispatch(fetchItineraries(result.data.itinerary.city));
      })
      .catch((error) => {
        console.log("error", error.response);
      });
  };
};

const fetchItineraryLoading = () => {
  return {
    type: FETCH_ITINERARY_LOADING,
  };
};
const fetchItinerarySuccess = (result) => {
  return {
    type: FETCH_ITINERARY_SUCCESS,
    payload: result,
  };
};
const fetchItineraryError = (error) => {
  return {
    type: FETCH_ITINERARY_ERROR,
    payload: error,
  };
};
