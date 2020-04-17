import {
  POST_LOGIN_DETAILS_LOADING,
  POST_LOGIN_DETAILS_SUCCESS,
  POST_LOGIN_DETAILS_ERROR,
} from "./actionTypes";
import axios from "axios";
import L from "../../components/CreateAccount";

export const postLoginDetails = () => {
  return (dispatch) => {
    dispatch(postLoginDetailsLoading());
    axios
      .post("http://localhost:5000/")
      .then((result) => {
        console.log(result);
        dispatch(postLoginDetailsSuccess(result));
      })
      .then((error) => {
        console.log(error);
        dispatch(postLoginDetailsError(error));
      });
  };
};

const postLoginDetailsLoading = () => {
  return {
    type: POST_LOGIN_DETAILS_LOADING,
  };
};
const postLoginDetailsSuccess = (result) => {
  return {
    type: POST_LOGIN_DETAILS_SUCCESS,
    payload: result,
  };
};
const postLoginDetailsError = (error) => {
  return {
    type: POST_LOGIN_DETAILS_ERROR,
    payload: error,
  };
};
