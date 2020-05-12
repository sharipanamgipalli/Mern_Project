const initState = {
  loggedInUser: [],
  isLogged: false,
  isLoggedOut: false,
  error: null,
  favourites: [],
  token: "",
};

export default function loginReducer(state = initState, action) {
  switch (action.type) {
    case "POST_LOGIN_DETAILS_LOADING":
      return {
        ...state,
        isLogged: false,
      };
    case "POST_LOGIN_DETAILS_SUCCESS":
      console.log(action);
      return {
        ...state,
        isLogged: true,
        isLoggedOut: false,
        loggedInUser: action.payload.user,
        token: action.payload.token,
        favourites: action.payload.favourites,
      };
    case "POST_LOGIN_DETAILS_ERROR":
      return {
        ...state,
        isLogged: false,
        error: action.payload,
      };
    case "LOG_OUT":
      return {
        ...state,
        loggedInUser: "",
        isLoggedOut: true,
        isLogged: false,
        token: null,
      };

    default:
      return state;
  }
}
