import {
  POST_USER_DETAILS_LOADING,
  POST_USER_DETAILS_SUCCESS,
  POST_USER_DETAILS_ERROR,
} from "./actionTypes";
import axios from "axios";
import CreateAccount from "../../components/CreateAccount";

export const postUserDetails = (newUser) => {
  return (dispatch) => {
    dispatch(postUserDetailsLoading());
    axios
      .post("http://localhost:5000/register/newUser", newUser)
      .then((result) => {
        console.log(result);
        dispatch(postUserDetailsSuccess(result));
      })
      .then((error) => {
        console.log(error);
        dispatch(postUserDetailsError(error));
      });
  };
};

const postUserDetailsLoading = () => {
  return {
    type: POST_USER_DETAILS_LOADING,
  };
};
const postUserDetailsSuccess = (result) => {
  return {
    type: POST_USER_DETAILS_SUCCESS,
    payload: result,
  };
};
const postUserDetailsError = (error) => {
  return {
    type: POST_USER_DETAILS_ERROR,
    payload: error,
  };
};
