const turf = require('@turf/turf');
const fs = require('fs');

let patientPoints = fs.readFileSync('../input/patient-data.geojson');
patientPoints = JSON.parse(patientPoints);

var distance = turf.distance(patientPoints);
fs.writeFileSync('../output/distance.geojson', JSON.stringify(distance));

console.log('saved distance.geojson');
