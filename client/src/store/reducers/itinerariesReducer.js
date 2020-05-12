const initialState = {
  itineraries: [],
  isLoading: false,
  error: null,

  isAddedItinerary: false,
  isDeletedItinerary: false,
  postedComment: false,
  deletedComment: false,
};
export default function itinerariesReducer(state = initialState, action) {
  console.log("state", state);
  switch (action.type) {
    case "FETCH_ITINERARY_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_ITINERARY_SUCCESS":
      return {
        ...state,
        isLoading: false,
        itineraries: action.payload,
      };
    case "FETCH_ITINERARY_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "ADD_USER_FAVOURITE_ITINERARY":
      return {
        ...state,
        isAddedItinerary: true,
      };
    case "DELETE_USER_FAVOURITE_ITINERARY":
      return {
        ...state,
        isDeletedItinerary: true,
      };
    case "POST_COMMENT_ITINERARY":
      return {
        ...state,
        postedComment: true,
      };
    case "DELTE_COMMENT_ITINERARY":
      return {
        ...state,
        deletedComment: true,
      };

    default:
      return state;
  }
}
