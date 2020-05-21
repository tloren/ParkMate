//body for finding a spot
import React, { useState, useEffect } from "react"
import MapComponent from "../Layouts/MapComponent"
//import { Link } from "react-router-dom"
//import { Typography, Button } from "@material-ui/core/"
import axios from 'axios'

const FinderBody = () => {
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
	var location = {lat:-37.8136, lng:144.9631, zoom:20}
	return <div>
		{locations.map((location, i) => (
          <h1 id={i}>
            Lat:{location.lat}, Lng:{location.lng}
          </h1>
        ))}
		<MapComponent location={locations}/>
	</div>
}


export default FinderBody