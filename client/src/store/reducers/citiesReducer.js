const initialState = {
  cities: [],
  isFetching: false
};

function citiesReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_CITY_LOADING":
      return {
        ...state,
        isFetching: true
      };
    case "FETCH_CITY_SUCCESS":
      return [
        ...state,
        {
          cities: action.payload.result,
          isFetching: false
        }
      ];
    case "FETCH_CITY_ERROR":
      return {
        ...state,
        isFetching: false,
        error: "Error occured"
      };
    default:
      return state;
  }
}
