import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";
import itinerariesReducer from "./itinerariesReducer";
import newAccountReducer from "./newAccountReducer";
import loginReducer from "./loginReducer";

const rootReducer = combineReducers({
  myCities: citiesReducer,
  myItineraries: itinerariesReducer,
  myUserDetails: newAccountReducer,
  myLoginDetails: loginReducer,
  myLogoutUser: loginReducer,
});

export default rootReducer;
