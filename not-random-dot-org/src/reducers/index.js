import { combineReducers } from "redux";
import optionsReducer from "./optionsReducer";

export default combineReducers({
  options: optionsReducer
});
