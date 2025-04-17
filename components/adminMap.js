import React from "react";
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { useState } from "react";
const AdminMap = (props) => {
  const mapStyles = {
    width: '100%',
    height: '100%',
    position: 'relative'
  };

  const [markerPosition, setMarkerPosition] = useState(null);

  const handleMapClick = (mapProps, map, clickEvent) => {
    const { latLng } = clickEvent;
    const lat = latLng.lat();
    const lng = latLng.lng();

    setMarkerPosition({ lat, lng });
    props.toggleModel(true)
    props.updateForm({ lat: lat, lng: lng })
  };
  return (
    <div className="w-full h-full " id="mapContainer">
      <Map
        google={props.google}
        zoom={9}
        style={mapStyles}
        initialCenter={{
          lat: 26.1158,
          lng: 91.7086,
        }}
        onClick={handleMapClick}
      >

        {props?.shelters?.map((item, key)=>{
          return <Marker key={key} position={{lat:item.lat, lng:item.lng}}></Marker>
        })}
        {markerPosition && (
          <Marker
            position={markerPosition}
            title="Marker Title"
          />
        )}
      </Map>

    </div>

  );
};

// export default AdminMap;
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBjX_00GI694FLmt2-_70v4ZHTL8DNa54E',
})(AdminMap);
