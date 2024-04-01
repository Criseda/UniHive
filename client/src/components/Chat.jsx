import React, { useEffect, useState } from "react";
import ChatSelector from "./ChatSelector";
import io from "socket.io-client";
const socket = io("http://localhost:5000");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [room, setRoom] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", { message });
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  //will always watch for recieve message event and alert the message
  useEffect(() => {
    socket.on(
      "recieve_message",
      (data) => {
        setMessageReceived(data.message);
      },
      [socket]
    );
  });

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
                              <ChatSelector />
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
                    <div className="modal-body">
                      <div className="msg-body">
                        <ul>
                          <li className="sender">
                            <p> Hey, Are you there? </p>
                            <span className="time">10:06 am</span>
                          </li>
                          <li className="sender">
                            <p> Hey, Are you there? </p>
                            <span className="time">10:16 am</span>
                          </li>
                          <li className="reply">
                            <p>yes!</p>
                            <span className="time">10:20 am</span>
                          </li>
                          <li className="sender">
                            <p> Hey, Are you there? </p>
                            <span className="time">10:26 am</span>
                          </li>
                          <li className="sender">
                            <p> Hey, Are you there? </p>
                            <span className="time">10:32 am</span>
                          </li>
                          <li className="reply">
                            <p>How are you?</p>
                            <span className="time">10:35 am</span>
                          </li>
                          <li>
                            <div className="divider">
                              <h6>Today</h6>
                            </div>
                          </li>
                          <li className="reply">
                            <p> yes, tell me</p>
                            <span className="time">10:36 am</span>
                          </li>
                          <li className="reply">
                            <p>{messageReceived}</p>
                            <span className="time">Just Now</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="send-box">
                      <form action="">
                        <input
                          type="text"
                          className="form-control"
                          aria-label="message…"
                          placeholder="Write message…"
                          onChange={(event) => {
                            setMessage(event.target.value);
                          }}
                        />
                        <button type="button" onClick={sendMessage}>
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
