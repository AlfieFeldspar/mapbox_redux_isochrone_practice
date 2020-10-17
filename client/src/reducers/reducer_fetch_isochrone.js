import { FETCH_ISOCHRONE} from "../actions/index";

export default function(state = {features: []}, action) {
  switch (action.type) {
    case FETCH_ISOCHRONE:
      return action.payload.features
    default:
      return state;
  }
}
