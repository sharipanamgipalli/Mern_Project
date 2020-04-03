const initialState = {
  itineraries: [],
  isLoading: false,
  error: null
};
export default function itinerariesReducer(state = initialState, action) {
  console.log("state", state);
  switch (action.type) {
    case "FETCH_ITINERARY_LOADING":
      return {
        ...state,
        isLoading: true
      };
    case "FETCH_ITINERARY_SUCCESS":
      return {
        ...state,
        isLoading: false,
        itineraries: action.payload
      };
    case "FETCH_ITINERARY_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
  }
}
