const express = require("express");
const bodyParser = require("body-parser");
var port = 8081;

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Simple NodeJs + Express + Router." });
});

//include route
require("./routes/level.routes.js")(app);

// set port, listen for requests
app.listen(port, () => {
  console.log("Server is running on port "+port+".");
});