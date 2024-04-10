// this is the entry point for the server
// this file is run by node
// run prettier with 2 space formatting on this file
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const routes = require("./routes");
const authRoutes = require("./auth/auth.js");
const cors = require("cors");
const app = express();
const http = require("http").createServer(app);
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET, // change this to a random string in a .env file
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    // try set cookies to secure in production
  })
);

// use the routes in the routes file
app.use("/api", routes);
app.use("/auth", authRoutes);

app.use(express.static(path.join(__dirname, "../client/build")));

app.use('*', (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html")); // should be 404
});

http.listen(5000, () => {
  console.log("server is listening on port 5000");
});

//setting up the socket.io for messages
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

//validiating the connection
socketIO.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

//when detecting send_message event send the message to the room (chat box)
  socket.on("send_message", (data) => {
    console.log("bro is sending a message: ", data); //debugging like crazy
    //socket.to(data.room).emit("receive_message", data);
    socketIO.in(data.room).emit("receive_message", data);
  });
  //when detecting joinRoom event join the room
  socket.on("joinRoom", ({ room }) => {
    console.log(`User joined room: ${room}`);
    socket.join(room);
  });
  
});
