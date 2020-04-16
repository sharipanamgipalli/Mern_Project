const initState = {
  newUser: [],
  isPosting: false,
  error: null,
};

export default function newAccountReducer(state = initState, action) {
  console.log("state", state);
  switch (action.type) {
    case "POST_USER_DETAILS_LOADING":
      return {
        ...state,
        isPosting: true,
      };
    case "POST_USER_DETAILS_SUCCESS":
      return {
        ...state,
        isPosting: false,
        newUser: action.payload,
      };
    case "POST_USER_DETAILS_ERROR":
      return {
        ...state,
        isPosting: false,
        error: action.payload,
      };
  }
}
