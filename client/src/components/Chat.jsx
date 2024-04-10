import React, { useEffect, useState, useRef } from "react";
import ChatSelector from "./ChatSelector";
import io from "socket.io-client";
import {getMessagesOfRoom} from "../api/items";
import {getLoggedInUser} from "../api/items";
import {createMessage} from "../api/items";


const socket = io("http://localhost:5000");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

 const handleSubmit = (event) => {
  event.preventDefault();
  const time = new Date().toISOString();
  // Add to database and create message object
  createMessage(currentUser.id, room, message, time)
    .then((newMessage) => {
      // Send message and receive it myself
      sendMessage(newMessage);
      //clear Everything 
      setMessage("");
      inputRef.current.value = "";
    })
    .catch((error) => {
      console.error("Error creating message:", error);
      // Handle error here
    });
};    
 
  //sends message to the server
  const sendMessage = (newMessage) => {
    //DEBUGGING
    socket.emit("send_message", { message: newMessage, room: room});
    setMessage("");
  }

  const handleItemClick = (roomId) => {
    setRoom(roomId);
    socket.emit("joinRoom", {room: roomId});
    //Joined room in backend (/server/app.js):w
  };  

  useEffect(() => {
    getLoggedInUser()
    .then((response) => {
      const user = response;
      setCurrentUser(user);
    }) 
    .catch((error) => {
      setError(error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, []);
   
 useEffect(() => { 
    getMessagesOfRoom(room) 
    .then((response) => {
      setMessages(response);
    })
    .catch((error) => {
      setError(error);  
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, [room]);

//looks for messages 
useEffect(() => {
  socket.on("receive_message", (data) => {
    setMessageReceived(data.message);
    setMessages(prevMessages => [...prevMessages, data.message]); // Append the received message to the messages array
  });

  // Cleanup function to remove the event listener when the component unmounts
  return () => {
    socket.off("receive_message");
  };
}, [socket]);

//scrolls to the bottom of the chat
useEffect(() => {
  if (chatContainerRef.current) {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }
}, [messages]);


  //Need to implement room concept but use user icons to change room number.
  //Need to implement the ability to generate a unique room number everytime a user is created.

  return (
    <section className="message-area">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="chat-area">
              {/* chatlist */}
              <div className="chatlist">
                <div className="modal-dialog-scrollable">
                  <div className="modal-content">
                    <div className="chat-header">
                      <div className="msg-search">
                        <input
                          type="text"
                          className="form-control"
                          id="inlineFormInputGroup"
                          placeholder="Search"
                          aria-label="search"
                        />
                        <a className="add" href="#">
                          <img
                            className="img-fluid"
                            src="https://mehedihtml.com/chatbox/assets/img/add.svg"
                            alt="add"
                          />
                        </a>
                      </div>
                      <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="Open-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#Open"
                            type="button"
                            role="tab"
                            aria-controls="Open"
                            aria-selected="true"
                          >
                            Open
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="Closed-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#Closed"
                            type="button"
                            role="tab"
                            aria-controls="Closed"
                            aria-selected="false"
                          >
                            Closed
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div className="modal-body">
                      {/* chat-list */}
                      <div className="chat-lists">
                        <div className="tab-content" id="myTabContent">
                          <div
                            className="tab-pane fade show active"
                            id="Open"
                            role="tabpanel"
                            aria-labelledby="Open-tab"
                          >
                            {/* chat-list */}
                            <div className="chat-list">
                              {/* stacked chats */}
                              <ChatSelector onItemClick={handleItemClick}/>
                            </div>
                            {/* chat-list */}
                          </div>
                          <div
                            className="tab-pane fade"
                            id="Closed"
                            role="tabpanel"
                            aria-labelledby="Closed-tab"
                          >
                            <div className="chat-list">
                              Closed is now redundant (remove?)
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* chat-list */}
                    </div>
                  </div>
                </div>
              </div>
              {/* chatlist */}
              {/* chatbox */}

              <div className="chatbox">
                <div className="modal-dialog-scrollable">
                  <div className="modal-content">
                    <div className="msg-head">
                      <div className="row">
                        <div className="col-8">
                          <div className="d-flex align-items-center">
                            <span className="chat-icon">
                              <img
                                className="img-fluid"
                                src="https://mehedihtml.com/chatbox/assets/img/arroleftt.svg"
                                alt="image title"
                              />
                            </span>
                            <div className="flex-shrink-0">
                              <img
                                className="img-fluid"
                                src="https://mehedihtml.com/chatbox/assets/img/user.png"
                                alt="user img"
                              />
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h3>person name</h3>
                              <p>Item name</p>
                            </div>
                          </div>
                        </div>

                        <div className="col-4">
                          <ul className="moreoption">
                            <li className="navbar nav-item dropdown">
                              <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i
                                  className="fa fa-ellipsis-v"
                                  aria-hidden="true"
                                />
                              </a>
                              <ul className="dropdown-menu">
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Action
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Another action
                                  </a>
                                </li>
                                <li>
                                  <hr className="dropdown-divider" />
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Something else here
                                  </a>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    {/* converstaion area */} 
                    <div className="modal-body" ref={chatContainerRef}>
                      <div className="msg-body" >
                        <ul>
                        {/*renders messages*/}
                        {messages.map((message, index) => {
                          const isSentByCurrentUser = message.sender_id === currentUser.id; 
                          const messageTime = new Date(message.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                          return (
                          <li key={index} className={isSentByCurrentUser ? "reply" : "sender"}>
                          <p>{message.message}</p>
                          <span className="time">{messageTime}</span>
                          </li>                       
                          );
                        })}   
   
                        </ul>
                      </div> 
                    </div>
                    {/* converstaion area END*/} 
                    {/* Send Message/attachment section */}
                    <div className="send-box">
                      <form action="">
                        <input
                          ref={inputRef}
                          type="text"
                          className="form-control"
                          aria-label="message…"
                          placeholder="Write message…"
                          onChange={(event) => {
                            setMessage(event.target.value);
                          }}
                        />
                        <button type="button" onClick={handleSubmit} disabled={!message.trim()}>
                          <i className="fa fa-paper-plane" aria-hidden="true" />{" "}
                          Send
                        </button>
                      </form>
                      <div className="send-btns">
                        <div className="attach">
                          <div className="button-wrapper">
                            <span className="label">
                              <img
                                className="img-fluid"
                                src="https://mehedihtml.com/chatbox/assets/img/upload.svg"
                                alt="image title"
                              />{" "}
                              Attach file
                            </span>
                            <input
                              type="file"
                              name="upload"
                              id="upload"
                              className="upload-box"
                              placeholder="Upload File"
                              aria-label="Upload File"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* chatbox */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
