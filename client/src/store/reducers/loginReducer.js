const initState = {
  loggedInUser: [],
  isLogged: false,
  error: null,
  message: " ",
};

export default function loginReducer(state = initState, action) {
  console.log("state", state);
  switch (action.type) {
    case "POST_LOGIN_DETAILS_LOADING":
      return {
        ...state,
        isLogged: true,
      };
    case "POST_LOGIN_DETAILS_SUCCESS":
      return {
        ...state,
        isLogged: false,
        loggedInUser: action.payload,
        // message: action.payload.message,
      };
    case "POST_LOGIN_DETAILS_ERROR":
      return {
        ...state,
        isLogged: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
