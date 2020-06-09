var soda = require('soda-js');

var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

let mydb, cloudant;
var vendor; // Because the MongoDB and Cloudant use different API commands, we
            // have to check which command should be used based on the database
            // vendor.
var dbName = 'mydb';


//TODO: take lat, lon and returns locations array
getDataAPI = function(lat, lon) {
    locations = []
    // var parking = new soda.Consumer('data.melbourne.vic.gov.au');
    // data = parking.query()
    //   .withDataset('vh2v-4nfs')
    //   .limit(5)
    //   .where({ bay_id: '3274' })
    //   //.where({ within_circle(location,'-37.81586448563712',144.98141868728942,1000) })
    //   .getRows()
    //     .on('success', function(rows) { console.log(rows); })
    //     .on('error', function(error) { console.error(error); });
    locations.push({'bay_id': 6589,'lat':-37.81317468, 'lon':144.940706})
    locations.push({'bay_id': 5271,'lat':-37.81181255, 'lon':144.9534953})
    locations.push({'bay_id': 5771,'lat':-37.81202872, 'lon':144.9764601})
    locations.push({'bay_id': 2041,'lat':-37.81295477, 'lon':144.9562052})
    return locations
}

//TODO: takes lat, lon and returns locations array
getDataDB = function(lat, lon){
  locations = []
  return locations
} 

//TODO: takes a location array and returns bool
storeData = function(locations){
  console.log("Data (supposedly) stored!")
} 


//-----------------OUR CODE----------------------
//Test message api
app.get('/api/test_message', function(req, res) {
  res.json({message: "Hello from the serverside!"})
})

//TODO: api to get nearby parking locations
app.post('/api/find_parking', function(req, res, next) {
    locations = []
    //Unpack parameters
    currLat = req.body.lat
    currLon =  req.body.lon
    console.log(currLat, currLon)

    //Try to fetch data from DB
    locations = getDataDB(currLat, currLon)

    //Try to fetch from API if data not in DB
    if(locations.length==0){
      locations = getDataAPI(currLat, currLon)
      storeData(locations)
    }
    
    //Set the response
    console.log(locations)
    res.json({locations: locations})
});


// serve the react app files
app.use(express.static(`${__dirname}/webapp/build`));

var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
