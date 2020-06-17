var express = require("express");
var app = express();
var cfenv = require("cfenv");
var request = require("request");
const bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const dotenv = require("dotenv");
dotenv.config()
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json({limit: '50mb'}))

// Swagger docs
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "ParkMate API",
            description: "API information for the ParkMate application",
            contact: {
                name:"Trevor L, Rohan B, Hamid Z"
            },
            servers: ["http://localhost:3000", 'http://parkingfinderservice.us-south.cf.appdomain.cloud']
        },
        "version":"1.0.0"
    },
    apis: ["server.js"]
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve , swaggerUi.setup(swaggerDocs))

var MongoClient = require('mongodb').MongoClient;

/**
 * @swagger
 *  definitions:
 *     Location:
 *       type: object
 *       properties:
 *         lat:
 *           type: float
 *           description: the latitude for a response
 *         lon:
 *           type: object
 *           description: the longitude for a response
 *       example: { 'lat': -37.81783601846206, 'lon': 144.95932102203372 }
 *     ParkingSpots:
 *       type: object
 *       properties:
 *         result:
 *           type: array
 *           description: The response json array with all parking spots embedded for the lat, lon
 *       example: {'locations': [ 
 *              { bay_id: 919, lat: -37.814215967685655, lon: 144.9687480312692 },
 *              { bay_id: 6910, lat: -37.81459062113608, lon: 144.9693496487792 },
 *              { bay_id: 913, lat: -37.814383963893654, lon: 144.96882358314184 },
 *              { bay_id: 917, lat: -37.81426349973698, lon: 144.96876939345793 }
 *          ]}
 *     Predictions:
 *       type: object
 *       properties:
 *         bounds:
 *           type: object
 *           description: bounds of the corners of the loaction rectangle
 *         val:
 *           type: float
 *           description: a value of total occupancy between 0 and 1
 *       example: [
 *              {"bounds": [[-37.795,144.96],[-37.79,144.965]],"val": 0.3755238652229309},
 *              {"bounds": [[-37.8,144.96],[-37.794999999999995,144.965]],"val": 0.5145497918128967}
 *          ]
 */

processLiveData = function(docs){
    locations = []
    if(docs.length>0){
        for(i=0; i<docs.length; i++){
            locations.push({'bay_id': docs[i].bay_id, 'lat':docs[i].lat, 'lon':docs[i].lon})
        }
    }
    return locations
} 

getLiveData = async function(lat, lon){
    searchMargin = 0.001;
    var url = 'mongodb+srv://'+process.env.dbuser+':'+process.env.dbpass+'@parkingdb-myglv.mongodb.net/ParkingDB?retryWrites=true&w=majority'
    client = await MongoClient.connect(url).catch(err => console.log(err));
    if (!client) {
        return;
    }
    try {
        let db = client.db('parkingdb');
        let collection = db.collection('parkings');
        let query = {status:'Unoccupied', 'lat' : { '$gt' : lat - searchMargin , '$lt' : lat + searchMargin }, 'lon' : { '$gt' : lon - searchMargin , '$lt' : lon + searchMargin }}
        res = await collection.find(query).toArray()
        return res;
    } catch (err) {

        console.log(err);
    } finally {

        client.close();
    }        
}
 
getIntervalData = async function() {
    var url = 'mongodb+srv://'+process.env.dbuser+':'+process.env.dbpass+'@parkingdb-myglv.mongodb.net/ParkingDB?retryWrites=true&w=majority'
    client = await MongoClient.connect(url).catch(err => console.log(err));
    if (!client) {
        return;
    }
    try {
        let db = client.db('parkingdb');
        let collection = db.collection('ParkingIntervals');
        res = await collection.find().toArray()
        return res;
    } catch (err) {

        console.log(err);
    } finally {

        client.close();
    }
}


//-----------------Routes----------------------

/**
 * @swagger
 *
 * /api/find_parking:
 *   post:
 *     description:  Use to find nearby unoccupied parking in melbourne city based on 3 hours of context 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: lat and lon
 *         description: user location latitude and longitude
 *         in:  body
 *         required: true
 *         type: object
 *         schema:
 *           $ref: '#/definitions/Location'
 *     responses:
 *       200:
 *         description: Predictions
 *         schema:
 *           $ref: '#/definitions/ParkingSpots'
 */
app.post('/api/find_parking', async function(req, res, next) {
    locations = []
    //Unpack parameters
    console.log(req.body);
    currLat = req.body.lat
    currLon =  req.body.lon

    //Try to fetch data from DB
    data = await getLiveData(currLat, currLon);
    locations = processLiveData(data);

    //Set the response
    console.log(locations)
    res.json({locations: locations})
});


/**
 * @swagger
 *
 * /api/forecast:
 *   get:
 *     description:  Use to find nearby unoccupied parking in melbourne city based on 3 hours of context 
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Predictions
 *         schema:
 *           $ref: '#/definitions/Predictions'
 */
app.get('/api/forecast', async function(req, res){
    body = await getIntervalData();
    var options = { 
        headers: {'content-type' : 'application/json'},
        url: "https://parkmatepredict.us-south.cf.appdomain.cloud/api/predict", 
        body: JSON.stringify(body)
    }
    //console.log(options)
    request.post( options, ( error, response, body ) => {
        res.json(response)
    });
});
// serve the react app files
app.use(express.static(`${__dirname}/webapp/build`));

var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});
