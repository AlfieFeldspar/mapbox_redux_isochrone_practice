import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import { getIsochrone } from '../actions/index';
const fs = require('fs');


mapboxgl.accessToken = 'pk.eyJ1IjoiYWxmaWVmZWxkc3BhciIsImEiOiJja2dlN2p5NGYwdnNoMnNtd2YzeHZ1ZWM1In0.BEAQoG1eBJD6auVwwTUzvA';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: -78.9105,
            lat: 36.0014,
            zoom: 7,
            data: {},
        };
    }
    componentDidMount() {
        let isoData = {};
        // Make the API call
        let fetchData = () => {
            this.props.getIsochrone(this.state.lng, this.state.lat)
                .then(response => this.setState({ data: response.payload.data }, function () {
                    console.log(this.state.data)
                    console.log('that was state.data')
                    // fs.writeFileSync('../output/isochroneSixtyMin.geojson', JSON.stringify(this.state.data));
                    return isoData = this.state.data;
                })
                )
        }
        fetchData();

        let mapCenter = [this.state.lng, this.state.lat]

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/alfiefeldspar/ckgfd04tt51lz19sx71ajimji',
            center: mapCenter,
            zoom: this.state.zoom
        });
        map.on('load', function () {
            console.log("adding marker & logging isodata")
            console.log(isoData)

            //add a center marker to map
            let marker = new mapboxgl.Marker({
                'color': '#314ccd'
            });
            marker.setLngLat(mapCenter).addTo(map);

            // When the map loads, add the source and layer

            let patientPoints = fs.readFileSync('../../input/patient-data.geojson');
            patientPoints = JSON.parse(patientPoints);
            console.log('the patient points')
            console.log(patientPoints);
            // map.addSource('ptPoints', {
            //     type: 'geojson',
            //     data: patientLocations
            // });

            // map.addLayer({
            //     "id": "ptLayer",
            //     "type": "symbol",
            //     "source": "ptPoints",
            // })

            console.log('adding iso')
            map.addSource('iso', {
                type: 'geojson',
                data: isoData
            });

            map.addLayer({
                'id': 'isoLayer',
                'type': 'fill',
                // Use "iso" as the data source for this layer
                'source': 'iso',
                'layout': {},
                'paint': {
                    // The fill color for the layer is set to a light purple
                    'fill-color': '#5a3fc0',
                    'fill-opacity': 0.3
                }
            }, "poi-label");

        });
        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });

        // const pointsInIsochrone = Turf.within(patientLocations, isoData);
        // console.log(pointsInIsochrone);

    };


    render() {
        return (
            <div>
                <div ref={el => this.mapContainer = el} className='mapContainer' />
            </div>
        )
    }
}

//these come back as data.features[0].geometry.coordinates
function mapStateToProps({ data }) {
    return { data };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getIsochrone }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
