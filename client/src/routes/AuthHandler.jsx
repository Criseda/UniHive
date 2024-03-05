import React, { useEffect } from "react";

const AuthHandler = () => {
  useEffect(() => {
    // Get the token cookie value
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    // Store the token in local storage
    localStorage.setItem("token", token);

    window.location.href = "http://localhost:3000/";
  }, []);

  return (
    <div>
      {/* Display loading or redirect message if necessary */}
      <p>Loading...</p>
    </div>
  );
};

export default AuthHandler;