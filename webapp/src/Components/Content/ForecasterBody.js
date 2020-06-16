import React, { useState, useEffect } from "react"
import { Map, CircleMarker, TileLayer, Marker, Popup, Rectangle } from "react-leaflet";
import { Typography, Button } from '@material-ui/core';
import axios from 'axios'
import RefreshIcon from '@material-ui/icons/Refresh';

const RectangleList = (props) => {
  console.log(typeof props.data)
  return (
    <span>
      { props.data.length>0 && props.data.map((item, i) => {
        return <Rectangle key={i} bounds={item.bounds} weight={0.2} fillOpacity={0.4} color={item.val>0.8? (item.val>0.9? "Red":"orange") : (item.val>0.6?"yellow":"green")} />;
      })}
    </span>
  );
}

const ForecasterBody = () => {
  const [currTime, setCurrTime] = useState([new Date().toLocaleString()]);
	const [areas, setAreas] = useState([]);
  const [currLocation, setCurrLocation] = useState([-37.814, 144.965]);
  const addLocation = (e) => {
    setCurrLocation([e.latlng.lat, e.latlng.lng])
    //console.log(currLocation)
    axios.post('/api/predict',{})
    .then(
      response => {console.log(response.data.body);
      setAreas(JSON.parse(response.data.body));}
    )
  }
  const refresh = (e) => {
    axios.post('/api/predict',{})
    .then(
      response => {console.log(response.data.body);
      setAreas(JSON.parse(response.data.body));}
    )
  }
	return <div style={{ width: '100%', height: '100vh'}}>
    <div style={{display: 'flex', marginTop: '10px'}}>
      <div>
      <Typography variant="h4" display="block" >
          Forecaster
      </Typography>
      <Typography variant="button" display="block" >
          Last updated: {currTime}
      </Typography>
      </div>
      <Button
        onClick={refresh}
        style={{ margin: "10px", marginLeft: "auto", background: "#ffc947" }}
        >
        <RefreshIcon />
      </Button>
      </div>
    { areas && <Map
          style={{ height: "600px", width: "100%" }}
          zoom={14}
          center={currLocation}
          onClick={addLocation} >
      <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <RectangleList data={areas}/>
    </Map>
  }

	</div>
}


export default ForecasterBody