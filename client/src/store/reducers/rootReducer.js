import { combineReducers } from "redux";
import citiesReducer from "./citiesReducer";

const rootReducer = combineReducers({
  myCities: citiesReducer
});

export default rootReducer;
