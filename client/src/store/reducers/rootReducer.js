import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import itinerariesReducer from "./itinerariesReducer";

const rootReducer = combineReducers({
  myCities: citiesReducer,
  myItineraries: itinerariesReducer
});

export default rootReducer;
