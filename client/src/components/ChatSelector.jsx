import React, { useEffect, useState } from "react";
import { Image, ListGroup } from "react-bootstrap";
import { getMessageRoomsOfUser, getLoggedInUser, getUser } from "../api/items";
import { getMessagesOfRoom } from "../api/items";


const ChatSelector = ({onItemClick}) => { // prop to handle the click event
  const [isLoading, setIsLoading] = useState(true); // State to hold the loading status
  const [rooms, setRooms] = useState([]); // State to hold the rooms
  const [currentUser, setCurrentUser] = useState(null); // State to hold the logged in user
  const [otherUsers, setOtherUsers] = useState({}); // State to hold the other users
  const [initialSelectionMade, setInitialSelectionMade] = useState(false); // State to hold the initial selection status

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getLoggedInUser(); // Fetch the logged in user
        setCurrentUser(response); // Update the state with the fetched user

        // After the user has been fetched, fetch the rooms
        const fetchRooms = async () => {
          try {
            const response = await getMessageRoomsOfUser(); // Fetch the rooms
            //logic to fetch most recent message
            const roomsData = await Promise.all(
              response.map(async (room) => {
                const otherUser = await getUser(room.user1 === currentUser ? room.user1 : room.user2); // Fetch the other user
                const messagesResonse = await getMessagesOfRoom(room.id); // Fetch the messages of the room
                const lastMessage = messagesResonse[messagesResonse.length - 1]; // Get the last message
                return {
                  id: room.id,
                  otherUser,
                  lastMessage
                };
              })
            );
            setRooms(roomsData); // Update the state with the fetched rooms
            // Fetch the other users
            const otherUsers = await Promise.all(
              response.map((room) =>
                getUser(room.user1 === currentUser ? room.user1 : room.user2)// Fetch the other user
              )
            );
            setOtherUsers(otherUsers); // Update the state with the fetched users
            setIsLoading(false); // Set loading to false after data is fetched
          } catch (error) {
            console.error("Error fetching rooms:", error);
          }
        };

        fetchRooms(); // Call the function after the user has been fetched
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser(); // Call the function when the component mounts
  }, [currentUser]);
  
//Function to handle when first landing on messages 
  useEffect(() => {
    if (!isLoading && rooms.length > 0 && !initialSelectionMade) {
      const {id, first_name, last_name} = rooms[0];
      onItemClick(id, first_name, last_name);
      
      setInitialSelectionMade(true);
    }
  }, [rooms, isLoading, onItemClick]);


  if (isLoading) {
    return <p>Loading...</p>; // Or render a spinner
  }
  
  if (rooms.length === 0) {
    return <p>No messages found</p>;
  }
//Function to render in all messagesWITHOUT USING PROPS (YET TO FINISH)
  
 const handleButtonClick = (roomId, firstName, lastName) => {
    onItemClick(roomId, firstName, lastName);
  };

  return (
    <ListGroup>
      {rooms.map((room, index) => (
        <ListGroup.Item
          action
          className="d-flex align-items-center"
          key={room.id}
          onClick={() => handleButtonClick(room.id, otherUsers[index].first_name, otherUsers[index].last_name)}
        >
          {otherUsers[index] && (
            <Image
              className="img-fluid me-3"
              src={otherUsers[index].avatar_path}
              alt="user img"
              roundedCircle
              style={{ width: "50px", height: "50px" }} // Adjust the width and height as needed
            />
          )}
          <div className="flex-grow-1 card-content">
            {otherUsers[index] && (
              <h5 className="mb-0 title">
                {otherUsers[index].first_name} {otherUsers[index].last_name}
              </h5>
            )}
            <p className="text">
              {room.lastMessage ? room.lastMessage.message : "No messages yet"}
            </p>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ChatSelector;
