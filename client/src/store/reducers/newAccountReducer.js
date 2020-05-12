const initState = {
  newUser: [],
  isPosting: false,
  error: null,
  message: " ",
};

export default function newAccountReducer(state = initState, action) {
  switch (action.type) {
    case "POST_USER_DETAILS_LOADING":
      return {
        ...state,
        isPosting: false,
      };
    case "POST_USER_DETAILS_SUCCESS":
      return {
        ...state,

        newUser: action.payload.createdUser,
        message: action.payload.message,
        isPosting: true,
      };
    case "POST_USER_DETAILS_ERROR":
      return {
        ...state,
        isPosting: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
