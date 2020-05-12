import {
  POST_LOGIN_DETAILS_LOADING,
  POST_LOGIN_DETAILS_SUCCESS,
  POST_LOGIN_DETAILS_ERROR,
  LOG_OUT,
} from "./actionTypes";
import axios from "axios";
import CreateAccount from "../../components/CreateAccount";
import jwt_decode from "jwt-decode";

export const postLoginDetails = (loggedInUser) => {
  return (dispatch) => {
    dispatch(postLoginDetailsLoading());
    axios
      .post("http://localhost:5000/user/login", loggedInUser)
      .then((result) => {
        console.log(result);

        dispatch(postLoginDetailsSuccess(result));
      })
      .catch((error) => {
        console.log(error);
        dispatch(postLoginDetailsError(error));
      });
  };
};
export const logoutUser = () => {
  return (dispatch) => {
    axios.get("http://localhost:3000/cities");
    localStorage.removeItem("token");
    dispatch({
      type: LOG_OUT,
    });
  };
};

const postLoginDetailsLoading = () => {
  return {
    type: POST_LOGIN_DETAILS_LOADING,
  };
};
const postLoginDetailsSuccess = (result) => {
  const token = result.data.token;
  localStorage.setItem("token", token);
  console.log("token");
  const decoded = jwt_decode(token);
  console.log("decoded", decoded);
  const payload = {
    token: token,
    user: decoded,
  };
  return {
    type: POST_LOGIN_DETAILS_SUCCESS,

    payload: payload,
  };
};
const postLoginDetailsError = (error) => {
  return {
    type: POST_LOGIN_DETAILS_ERROR,
    payload: error,
  };
};
