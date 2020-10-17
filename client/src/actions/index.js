import axios from 'axios';
import mapboxgl from 'mapbox-gl';

export const FETCH_ISOCHRONE = 'FETCH_ISOCHRONE';

// // Create variables to use in getIso()
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxmaWVmZWxkc3BhciIsImEiOiJja2dkdnppdTUwNXExMnJycnMzb2pnc3RlIn0.WfT7ai4-sZGfgly6YWsqMQ';
const rootUrl = 'https://api.mapbox.com/isochrone/v1/mapbox';
let profile = 'driving';
let minutes = 60;
let request = '';
// let isochroneQuery = (`${rootUrl}${profile}/${lon},${lat}?contours_minutes=${minutes}&polygons=true&access_token=${mapboxgl.accessToken}`);

// Create a function that sets up the Isochrone API query then makes an axios call
export function getIso(long, lat) {
    request = axios.get(`${rootUrl}/${profile}/${long},${lat}?contours_minutes=${minutes}&polygons=true&access_token=${mapboxgl.accessToken}`);
    console.log("fetching isochrone")
    console.log(request);
    return {
        type: 'FETCH_ISOCHRONE',
        payload: request,
    };
}

// Call the getIso function
// You will remove this later - it's just here so you can see the console.log results in this step
// getIso();