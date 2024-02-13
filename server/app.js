// this is the entry point for the server
// this file is run by node
// run prettier with 2 space formatting on this file
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// use the routes in the routes file
app.use('/api', routes);



app.listen(5000, () => {
  console.log("server is listening on port 5000");
});

//run the server with the command: nodemon app
