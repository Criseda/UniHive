// this is the entry point for the server
// this file is run by node
// run prettier with 2 space formatting on this file
const express = require("express");
const app = express();

app.listen(5000, () => {
  console.log("server is listening on port 5000");
});

//run the server with the command: nodemon index
