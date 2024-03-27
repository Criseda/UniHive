import React from "react";

const ChatSelector = () => {
  return (
    <button>
    <a href="#" className="d-flex align-items-center">
      <div className="flex-shrink-0">
        <img
          className="img-fluid"
          src="https://mehedihtml.com/chatbox/assets/img/user.png"
          alt="user img"
        />
        <span className="active" />
      </div>
      <div className="flex-grow-1 ms-3">
        <h3>Person name</h3>
        <p>Item name</p>
      </div>
    </a>
    </button>
  );
};

export default ChatSelector;
