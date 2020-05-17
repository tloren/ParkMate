import React from "react"
import { AppBar, Toolbar, Typography } from "@material-ui/core/"

{/*
Author: Trevor Neil Loren
Created Date : 2020/01/02
Modified Data: 2020/02/09
Description: Header to be displayed on the website landing page
*/}
const Header = () => {
    return (
      <AppBar position="static" >
        <Toolbar>
          <Typography variant="h3" color="inherit">
            Parking Finder
          </Typography>
        </Toolbar>
      </AppBar>
    )
}

export default Header
