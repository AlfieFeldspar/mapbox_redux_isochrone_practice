import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import {getIso} from '../actions/index';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            long: -78.9105,
            lat: 36.0014,
            zoom: 13.59,
            coordinates: []
        };
    }
    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.long, this.state.lat],
            zoom: this.state.zoom
        });
        map.on('move', () => {
            this.setState({
                long: map.getCenter().long.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        })
        this.props.getIso(this.state.long, this.state.lat);
    }


    render() {
        return (
            <div>
                <div ref={el => this.mapContainer = el} className='mapContainer' />
            </div>
        )
    }
}

//these come back as data.products.list
function mapStateToProps({ coordinates}) {
    return { coordinates };
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getIso }, dispatch);
  }  

export default connect(mapStateToProps, mapDispatchToProps)(App);
