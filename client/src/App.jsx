import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Item from "./routes/Item";
import Messages from "./routes/Messages";
import Saved_items from "./routes/Saved_items";
import Profile from "./routes/Profilepage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/item/:id" element={<Item />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/Saveditem" element={<Saved_items />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
