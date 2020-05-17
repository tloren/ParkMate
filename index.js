/**
 * Required External Modules
 */
const express = require("express")
const path = require("path")
/**
 * App Variables
 */
const app = express()
const port = process.env.PORT || "3001";
/**
 *  App Configuration
 */

/**
 * Routes Definitions
 */
app.get("/api/test", (req, res) => {
  res.json({message: "Hello from the ServerSideeeee!"})
})
/**
 * Server Activation
 */
 app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
})