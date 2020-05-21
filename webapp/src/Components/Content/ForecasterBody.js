//body for forecasting parking
import React, { useState, useEffect } from "react"
import MapComponent from "../Layouts/MapComponent"
//import { Link } from "react-router-dom"
//import { Typography, Button } from "@material-ui/core/"
import axios from 'axios'

const ForecasterBody = () => {
	const [locations, setLocations] = useState([]);
	useEffect(() => {
	console.log("fetching")
	const fetchData = async () => {
	  const result = await axios({
	      url: '/api/test',
	      method: 'get'
	  })
	  console.log(result)
	  setLocations(result.data.locations);
	};
	fetchData();
	}, []);
	return <div>
		{locations.map((location, i) => (
          <h1 id={i}>
            Lat:{location.lat}, Lng:{location.lng}
          </h1>
        ))}
		<MapComponent location={locations}/>
	</div>
}


export default ForecasterBody