import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import { getIsochrone } from '../actions/index';

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
                    return isoData = this.state.data;
                })
                )
        }
        fetchData();

        let mapCenter = [this.state.lng, this.state.lat]

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: mapCenter,
            zoom: this.state.zoom
        });
        map.on('load', function () {
            console.log("adding marker & logging isodata")
            console.log(isoData)
            let marker = new mapboxgl.Marker({
                'color': '#314ccd'
            });
            marker.setLngLat(mapCenter).addTo(map);


            // When the map loads, add the source and layer
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
