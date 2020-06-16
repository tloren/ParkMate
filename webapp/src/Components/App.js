import React from "react"
import Home from "./Content/Home"
import { Header, Footer, BodyTabs } from "./Layouts"
const style = {
  background: 'linear-gradient(90deg, #1b1b1b 30%, #1b1b1b 90%)',
  borderRadius: 3,
  border: 0,
  color: 'white',
  width: '100%',
  height: '100%'
};
const App = () => {
  return <div style={style}>
  	<Home />
  </div>
}

export default App