import { FETCH_ISOCHRONE} from "../actions/index";

export default function(state = {coordinates: []}, action) {
  switch (action.type) {
    case FETCH_ISOCHRONE:
      return action.payload.features.geometry.coordinates
    default:
      return state;
  }
}
