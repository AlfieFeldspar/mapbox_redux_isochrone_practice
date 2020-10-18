import { FETCH_ISOCHRONE} from "../actions/index";

export default function(state = {data: []}, action) {
  console.log("in reducer!")
  switch (action.type) {
    case FETCH_ISOCHRONE:
      return action.payload.data
    default:
      return state;
  }
}
