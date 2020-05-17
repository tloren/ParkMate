//body for forecasting parking
import React, { useState, useEffect } from "react"
import MapComponent from "../Layouts/MapComponent"
//import { Link } from "react-router-dom"
//import { Typography, Button } from "@material-ui/core/"
import axios from 'axios'

const ForecasterBody = () => {
	const [message, setMessage] = useState([]);
	useEffect(() => {
	console.log("fetching")
	const fetchData = async () => {
	  const result = await axios({
	      url: '/api/test',
	      method: 'get'
	  })
	  console.log(result)
	  setMessage(result.data.message);
	};
	fetchData();
	}, []);
	var location = {lat:-37.8136, lng:144.9631, zoom:20}
	return <div>
		<h1>{message}</h1>
		<MapComponent location={location}/>
	</div>
}


export default ForecasterBody