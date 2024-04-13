import io from "socket.io-client";
import { createMessageRoom } from "./items"

const socket = io(`http://${process.env.REACT_APP_CLIENT_HOST || "localhost"}:5000`);

export const joinRoom = (id) => {
    socket.emit("joinRoom", id);
};

//This creates the message room between the user and the seller
export const createMessage = async (seller_id) => {
    try {
      const response = await createMessageRoom(seller_id); //This will add the room to the database
      const roomId = response.id; // Extract the room ID from the response
      joinRoom(roomId); // Join the room with the given ID
    } catch (error) {
      console.error("Failed to create and join room:", error);
    }
};