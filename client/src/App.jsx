import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Item from "./routes/Item";
import Messages from "./routes/Messages";
import Saved_items from "./routes/Saved_items";
import { checkAuth, authLogin } from "./api/authentication";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loggedIn) {
      setIsLoading(true);
      try {
        checkAuth().then((res) => {
          setLoggedIn(res.authenticated);
          if (!res.authenticated) {
            authLogin();
          }
          console.log(res);
        });
      } catch (error) {
        setError(error);
        console.error(error);
      }
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div className="container text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">Error: {error.message}</div>
      </div>
    );
  }

  if (!loggedIn) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">You must login</div>
      </div>
    );
  }

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
