import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Item from "./routes/Item";
import Messages from "./routes/Messages";
import Saved_items from "./routes/Saved_items";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/item/:id" element={<Item />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/Saveditem" element={<Saved_items />} />
      </Routes>
    </Router>
  );
};

export default App;
