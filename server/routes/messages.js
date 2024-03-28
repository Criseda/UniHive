const express = require("express");
const router = express.Router();
const pool = require("../db");
const { cookieJWTAuth } = require("../middleware/cookieJWTAuth");

//Room routes 

//create a messageRoom 
router.post("/room", cookieJWTAuth, async (req, res) => {
  try { 
    console.log("create a messageRoom")
    const user1_id = req.username;
    const user2_id = req.body.user2_id;
    const newMessageRoom = await pool.query("INSERT INTO messageRoom (user1, user2) VALUES($1, $2) RETURNING *", [user1_id, user2_id]);
    console.log(newMessageRoom.rows[0]);
    res.json(newMessageRoom.rows[0]);
    
  } catch (err) {
    console.error(err.message);
  }
});


//get all messageRooms
router.get("/room", async (req, res) => {
  try {
  const allMessageRooms = await pool.query("SELECT * FROM messageRoom");
  res.json(allMessageRooms.rows);
  } catch (err) {
  console.error(err.message);
  }
}); 

//get a specific messageRoom id by user id ; 
router.get("/room/:id", async (req, res) => {
  try {
  const { id } = req.params;
  const messageRoom = await pool.query("SELECT * FROM messageRoom WHERE id = $1", [id]);
  res.json(messageRoom.rows[0]);
  } catch (err) {
  console.error(err.message);
  }
});


//Delete a messageRoom by id
router.delete("/room/:id", async (req, res) => {
  try {
  const { id } = req.params;
  const deleteMessageRoom = await pool.query("DELETE FROM messageRoom WHERE id = $1", [id]);
  res.json("MessageRoom was deleted!");
  } catch (err) {
  console.error(err.message);
  }
});

//get messageroom by user id
router.get("/room/user/:id", async (req, res) => {
  try {
  const { id } = req.params;
  const messageRoom = await pool.query("SELECT * FROM messageRoom WHERE user1 = $1 OR user2 = $1", [id]);
  res.json(messageRoom.rows);
  } catch (err) {
  console.error(err.message);
  }
});




// define routes for messages here

// get all messages
router.get("/", async (req, res) => {
  try {
	const allMessages = await pool.query("SELECT * FROM message");
	res.json(allMessages.rows);
  } catch (err) {
	console.error(err.message);
  }
});

//get a spcific message by ID 
router.get("/:id", async (req, res) => {
  try {
	const { id } = req.params;
	const message = await pool.query("SELECT * FROM message WHERE id = $1", [id]);
	res.json(message.rows[0]);
  } catch (err) {
	console.error(err.message);
  }
});

//send a new message (add message to the database)
router.post("/", async (req, res) => {
  try {
	const { sender_id, receiver_id, message } = req.body;
	const newMessage = await pool.query("INSERT INTO message (sender_id, receiver_id, message) VALUES($1, $2, $3) RETURNING *", [sender_id, receiver_id, message]);
	res.json(newMessage.rows[0]);
  } catch (err) {
	console.error(err.message);
  }
});

//Delete a message by id 
router.delete("/:id", async (req, res) => {
  try {
	const { id } = req.params;
	const deleteMessage = await pool.query("DELETE FROM message WHERE id = $1", [id]);
	res.json("Message was deleted!");
  } catch (err) {
	console.error(err.message);
  }
});

//update a message by id
router.put("/:id", async (req, res) => {
  try {
	const { id } = req.params;
	const { message } = req.body;
	const updateMessage = await pool.query("UPDATE message SET message = $1 WHERE id = $2", [message, id]);
	res.json("Message was updated!");
  } catch (err) {
	console.error(err.message);
  }
});

// Get all messages sent or received by a specific user
router.get("/users/:id", async (req, res) => {
	try {
	  const { id } = req.params;
	  
	  // Query for messages where the sender or receiver is the specified user ID
	  const userMessages = await pool.query("SELECT * FROM message WHERE sender_id = $1 OR receiver_id = $1", [id]);
  
	  res.json(userMessages.rows); // return the messages
	} catch (err) {
	  console.error(err.message);
	  res.status(500).send("Internal Server Error");
	}
  });
  



//Get all messages send between two users
router.get("/users/:id1/:id2", async (req, res) => {
	try {
	  const { id1, id2 } = req.params;
	  
	  // Query for messages where the sender or receiver is the specified user ID
	  const userMessages = await pool.query("SELECT * FROM message WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)", [id1, id2]);
  
	  res.json(userMessages.rows); // return the messages
	} catch (err) {
	  console.error(err.message);
	  res.status(500).send("Internal Server Error");
	}
  });


module.exports = router; // export the router




