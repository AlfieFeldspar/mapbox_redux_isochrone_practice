import { combineReducers } from "redux";
import IsochroneReducer from "./reducer_fetch_isochrone";
  
const rootReducer = combineReducers({
  features: IsochroneReducer,
});

export default rootReducer;