//body for finding a spot
import React, { useState, useEffect } from "react"
//import { Link } from "react-router-dom"
//import { Typography, Button } from "@material-ui/core/"
import axios from 'axios'

const FinderBody = () => {
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
	return <h1>{message}</h1>
}


export default FinderBody