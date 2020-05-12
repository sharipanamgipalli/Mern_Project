const initialState = {
  cities: [],
  isFetching: false,
  error: null,
};

export default function citiesReducer(state = initialState, action) {
  // console.log("state", state);
  switch (action.type) {
    case "FETCH_CITY_LOADING":
      return {
        ...state,
        isFetching: true,
      };
    case "FETCH_CITY_SUCCESS":
      return {
        ...state,
        cities: action.payload,
        isFetching: false,
      };

    case "FETCH_CITY_ERROR":
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
