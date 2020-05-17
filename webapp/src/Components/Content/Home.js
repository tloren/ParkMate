import React, { useState, useEffect } from "react"
import { Header, Footer, BodyTabs } from "../Layouts"
//import { Link } from "react-router-dom"
//import { Typography, Button } from "@material-ui/core/"
import axios from 'axios'
{/*
Author: Trevor Neil Loren
Created Date : 2020/01/02
Modified Data: 2020/02/10
Description: Component to render the home page component
*/}
export default function Home(props){

  return <div>
  <Header />
  <BodyTabs />
  <Footer />
  </div>

}
