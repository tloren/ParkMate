import React from "react"
import { AppBar, Toolbar, Typography } from "@material-ui/core/"

const style = {
  background: 'linear-gradient(45deg, #ffc947 30%, #ff9800 90%)',
  borderRadius: 3,
  border: 0,
  color: 'black',
};
const Header = () => {
    return (
      <AppBar position="static" style={style}>
        <Toolbar>
          <Typography variant="h3" color="inherit">
            ParkMate
          </Typography>
        </Toolbar>
      </AppBar>
    )
}

export default Header
