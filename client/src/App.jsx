import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Item from "./routes/Item";
import Messages from "./routes/Messages";
import Saved_items from "./routes/Saved_items";
import { checkAuth } from "./api/authentication";

const App = () => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    try {
      checkAuth().then((res) => {
        setAuthenticated(res);
        console.log(res);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/item/:id" element={<Item />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/Saveditem" element={<Saved_items />} />
      </Routes>
    </Router>
  );
};

export default App;
