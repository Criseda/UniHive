import React, { useEffect, useState } from "react";
import { Image, ListGroup } from "react-bootstrap";
import { getMessageRoomsOfUser, getLoggedInUser, getUser } from "../api/items";

const ChatSelector = () => {
  const [isLoading, setIsLoading] = useState(true); // State to hold the loading status
  const [rooms, setRooms] = useState([]); // State to hold the rooms
  const [currentUser, setCurrentUser] = useState(null); // State to hold the logged in user
  const [otherUsers, setOtherUsers] = useState({}); // State to hold the other users

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getLoggedInUser(); // Fetch the logged in user
        setCurrentUser(response); // Update the state with the fetched user

        // After the user has been fetched, fetch the rooms
        const fetchRooms = async () => {
          try {
            const response = await getMessageRoomsOfUser(); // Fetch the rooms
            setRooms(response); // Update the state with the fetched rooms
            // Fetch the other users
            const otherUsers = await Promise.all(
              response.map((room) =>
                getUser(room.user1 === currentUser ? room.user1 : room.user2)
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

  if (isLoading) {
    return <p>Loading...</p>; // Or render a spinner
  }

  return (
    <ListGroup>
      {rooms.map((room, index) => (
        <ListGroup.Item
          action
          className="d-flex align-items-center"
          key={room.id}
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
              Last message here there was a dog his name wass blog lalala
              testing a very long message to see if overflow works (it does
              hooray!)
            </p>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ChatSelector;
