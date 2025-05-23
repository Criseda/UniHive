import React, { useEffect, useState, useRef } from "react";
import { Button, Tab, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import io from "socket.io-client";
import ChatSelector from "./ChatSelector";
import {
  getMessagesOfRoom,
  getLoggedInUser,
  createMessage,
  uploadMessageImage,
} from "../api/items";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);
  const fileInputRef = useRef(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatarPath, setAvatarPath] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const time = new Date().toISOString();

    if (fileInputRef.current.files.length > 0) {
      const formData = new FormData();
      formData.append("image", fileInputRef.current.files[0]);

      uploadMessageImage(formData)
        .then((data) => {
          if (data.imageUrl) {
            return createMessage(
              currentUser.id,
              room,
              message,
              time,
              data.imageUrl
            );
          } else if (data.message) {
            alert(data.message);
            throw new Error(data.message);
          }
        })
        .then((newMessage) => {
          // Send message and receive it myself
          sendMessage(newMessage);
          //clear Everything
          setMessage("");
          inputRef.current.value = "";
          setSelectedFileUrl(null);
          fileInputRef.current.value = ""; // Clear the file input
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    } else {
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
        });
    }
  };

  //sends message to the server
  const sendMessage = (newMessage) => {
    //DEBUGGING
    socket.emit("send_message", { message: newMessage, room: room });
    setMessage("");
  };

  const handleItemClick = (roomId, firstName, lastName, avatarPath) => {
    setRoom(roomId);
    setFirstName(firstName);
    setLastName(lastName);
    setAvatarPath(avatarPath); // Add this line to set the avatarPath state
    socket.emit("joinRoom", { room: roomId });
    //Joined room in backend (/server/app.js):w
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file.type.startsWith("image/")) {
      alert("File is not an image.");
      return;
    }
    setSelectedFileUrl(URL.createObjectURL(file));
  };

  useEffect(() => {
    getLoggedInUser()
      .then((response) => {
        setCurrentUser(response);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (room) {
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
    }
  }, [room]);

  //looks for messages
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]); // Append the received message to the messages array
    });

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      socket.off("receive_message");
    };
  }, []);

  //scrolls to the bottom of the chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  if (loading) {
    return null; // makes it less jarring when the page loads
  }

  if (error) {
    return (
      <Container className="mt-4">
        <div className="alert alert-danger">Error: {error.message}</div>
      </Container>
    );
  }

  return (
    <section className="message-area">
      <Container>
        <Row className="chat-area">
          <Col className="chatlist" xs={4}>
            <div className="modal-dialog-scrollable">
              <div className="modal-content">
                <div className="chat-header">
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
                        Chats
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="modal-body">
                  <div className="chat-lists">
                    <Tab.Content>
                      <Tab.Pane eventKey="open" active>
                        <div className="chat-list">
                          <ChatSelector onItemClick={handleItemClick} />
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col className="chatbox" xs={8}>
            <div className="modal-dialog-scrollable">
              <div className="modal-content">
                <div className="msg-head">
                  <Row>
                    <Col>
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0">
                          <img
                            className="img-fluid"
                            src={avatarPath}
                            alt="user img"
                            style={{ width: "4rem", height: "4rem" }}
                          />
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h3>
                            {firstName} {lastName}
                          </h3>
                          {/* might remove the item name */}
                          <p>{/* might remove the item name */}</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="modal-body" ref={chatContainerRef}>
                  <div className="msg-body">
                    <ul>
                      {messages.map((message, index) => {
                        const isSentByCurrentUser =
                          message.sender_id === currentUser.id;
                        const messageTime = new Date(
                          message.created_at
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        });
                        return (
                          <li
                            key={index}
                            className={isSentByCurrentUser ? "reply" : "sender"}
                          >
                            {message.image_path && (
                              <>
                                <img
                                  src={`http://localhost:5000${message.image_path}`}
                                  alt="message"
                                  style={{
                                    maxWidth: "240px",
                                    maxHeight: "180px",
                                    height: "auto",
                                  }}
                                />
                                <br />
                              </>
                            )}
                            <p>{message.message}</p>
                            <span className="time">{messageTime}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="send-box">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    <Button onClick={() => fileInputRef.current.click()}>
                      <FontAwesomeIcon icon={faPaperclip} /> Upload image
                    </Button>
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
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!message.trim()}
                    >
                      <i className="fa fa-paper-plane" aria-hidden="true" />{" "}
                      Send
                    </button>
                  </form>
                  {selectedFileUrl && (
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                      }}
                    >
                      <Button
                        variant="danger"
                        style={{ position: "absolute", top: 0, right: 0 }}
                        onClick={() => {
                          setSelectedFileUrl(null);
                          fileInputRef.current.value = "";
                        }}
                      >
                        X
                      </Button>
                      <img
                        src={selectedFileUrl}
                        alt="Selected"
                        style={{
                          maxWidth: "400px",
                          maxHeight: "300px",
                          height: "auto",
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Chat;
