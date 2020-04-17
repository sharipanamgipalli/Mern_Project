import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import itinerariesReducer from "./itinerariesReducer";
import newAccountReducer from "./newAccountReducer";

const rootReducer = combineReducers({
  myCities: citiesReducer,
  myItineraries: itinerariesReducer,
  myUserDetails: newAccountReducer,
});

export default rootReducer;
