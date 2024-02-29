import React, { useEffect } from "react";

const AuthHandler = () => {
  useEffect(() => {

    const urlParams = new URLSearchParams(window.location.search);
    const csticket = urlParams.get("csticket");
    const username = urlParams.get("username");
    const fullname = urlParams.get("fullname");

    sessionStorage.setItem("csticket", csticket);
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("fullname", fullname);

    window.location.replace("http://localhost:3000/home");

  }, []);

  return (
    <div>
      {/* Display loading or redirect message if necessary */}
      <p>Loading...</p>
    </div>
  );
};

export default AuthHandler;
