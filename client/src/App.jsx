import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Item from "./routes/Item";
import Messages from "./routes/Messages";
import Saved_items from "./routes/Saved_items";
import AuthHandler from "./routes/AuthHandler";

const ProtectedRoute = ({ element, ...rest }) => {
  const isAuthenticated = sessionStorage.getItem("csticket") && sessionStorage.getItem("username") && sessionStorage.getItem("fullname");
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/item/:id" element={<ProtectedRoute element={<Item />} />} />
        <Route path="/messages" element={<ProtectedRoute element={<Messages />} />} />
        <Route path="/Saveditem" element={<ProtectedRoute element={<Saved_items />} />} />
        <Route path="/AuthHandler" element={<AuthHandler />} /> {/* AuthHandler route is not protected */}
      </Routes>
    </Router>
  );
};

export default App;