import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

const MapComponent = (props) => {
 	console.log(props)
	return <div style={{ width: '100%', height: '100vh'}}>
	<Map 
         center={[props.location.lat, props.location.lng]} 
         zoom={props.location.zoom} 
         style={{ width: '100%', height: '100%'}}
     >
      <TileLayer
        attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
       />
     </Map>
	</div>
	//return <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d25203.115353700465!2d144.97672173955078!3d-37.85117770000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sau!4v1589704284576!5m2!1sen!2sau" width="600" height="450" frameborder="0" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
}

export default MapComponent