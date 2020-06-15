var express = require("express");
var app = express();
var cfenv = require("cfenv");
var request = require("request");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json())
//TODO: takes lat, lon and returns locations array from realTimeCollection
getLiveData = function(lat, lon){
    locations = []
    locations.push({'bay_id': 6589,'lat':-37.81317468, 'lon':144.940706})
    locations.push({'bay_id': 5271,'lat':-37.81181255, 'lon':144.9534953})
    locations.push({'bay_id': 5771,'lat':-37.81202872, 'lon':144.9764601})
    locations.push({'bay_id': 2041,'lat':-37.81295477, 'lon':144.9562052})
    return locations
} 
//TODO: 
getIntervalData = function() {
    return //3 snapshots over three hours in JSON for intervalCollections
}

//TODO: takes a location array and returns bool
// storeData = function(locations){
//   console.log("Data (supposedly) stored!")
// } 


//-----------------OUR CODE----------------------

//TODO: api to get nearby parking locations
app.post('/api/find_parking', function(req, res, next) {
    locations = []
    //Unpack parameters
    console.log(req.body)
    currLat = req.body.lat
    currLon =  req.body.lon
    console.log(currLat, currLon)

    //Try to fetch data from DB
    locations = getLiveData(currLat, currLon)
    
    //Set the response
    console.log(locations)
    res.json({locations: locations})
});

app.get('/api/predict', function(req, res, next){
    data = getIntervalData()
    var options = { url     : "https://parkmatepredict.us-south.cf.appdomain.cloud/api/predict" }
    request.get( options, ( error, response, body ) => {
        console.log(response);
        res.json(response)
    });
});
// serve the react app files
app.use(express.static(`${__dirname}/webapp/build`));

var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
