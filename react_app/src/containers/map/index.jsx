import React from 'react';
import {
  Map, InfoWindow, Marker, GoogleApiWrapper,
} from 'google-maps-react';
import './style.scss';
function MapContainer(props) {
  const style = {
    width: '85%',
    height: '20em',
  }

  return (
    <div className="mapContainer">
          <Map google={props.google} style={style} zoom={14}>

      <Marker
        name="Current location"
      />

      <InfoWindow >
        <div>
          <h1></h1>
        </div>
      </InfoWindow>
      </Map>
    </div>

  );
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDdEwTIghwCeMWTXm0QtiCpOJqTwuCIRrY'),
})(MapContainer);
