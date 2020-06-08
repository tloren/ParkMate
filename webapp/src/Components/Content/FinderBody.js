import React, { useState, useEffect } from "react"
import { Map, CircleMarker, TileLayer, Marker, Popup } from "react-leaflet";
import axios from 'axios'


const FinderBody = () => {
  const [locations, setLocations] = useState([]);
  const [currLocation, setCurrLocation] = useState([-37.814, 144.965]);
  const addLocation = (e) => {
    setCurrLocation([e.latlng.lat, e.latlng.lng])
    console.log(currLocation)
    axios.post('/api/find_parking', {
    lat: e.latlng.lat,
    lon: e.latlng.lng })
    .then(
      response => {console.log(response.data.locations);
      setLocations(response.data.locations);}
    )
  }
	return <div style={{ width: '100%', height: '100vh'}}>
    <h1> Click on a location to get started! </h1>
    
    { locations && <Map
          style={{ height: "600px", width: "100%" }}
          zoom={16}
          center={currLocation}
          onClick={addLocation} >
      <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <CircleMarker
        radius = {100}
        center={currLocation}
        opacity={0.5}
      >
         <Popup>
           <span>Current Search Area</span>
         </Popup>
      </CircleMarker>
      { locations.map((item, key) => {return (
          <Marker position={[item.lat, item.lon]}>
            <Popup>
              Bay: {item.bay_id}
            </Popup>
          </Marker>
        )})
      }
    </Map>
  }
	</div>
}


export default FinderBody