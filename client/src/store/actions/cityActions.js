import {
  FETCH_CITY_SUCCESS,
  FETCH_CITY_ERROR,
  FETCH_CITY_LOADING,
  POST_LOGIN_DETAILS_SUCCESS,
} from "./actionTypes";
import Cities from "../../components/Cities";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const fetchCities = () => {
  return (dispatch) => {
    dispatch(fetchCitiesLoading());
    fetch("http://localhost:5000/cities/all")
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log("result", result);
        dispatch(fetchCitiesSuccess(result));
      })
      .catch((error) => {
        console.log("Error occured", error);
        dispatch(fetchCitiesError(error));
      });
  };
};

export const googleAuth = (code) => {
  return (dispatch) => {
    const token = code;
    localStorage.setItem("token", token);
    console.log(token);
    const decoded = jwt_decode(token);
    console.log("decoded", decoded);
    const payload = {
      token: token,
      user: decoded,
    };
    dispatch({
      type: POST_LOGIN_DETAILS_SUCCESS,

      payload: payload,
    });
  };
};

const fetchCitiesSuccess = (result) => {
  return {
    type: FETCH_CITY_SUCCESS,
    payload: result,
  };
};
const fetchCitiesError = (error) => {
  return {
    type: FETCH_CITY_ERROR,
    payload: error,
  };
};

const fetchCitiesLoading = () => {
  return {
    type: FETCH_CITY_LOADING,
  };
};
