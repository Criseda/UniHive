import React from 'react'
import Navbar from "../components/Navbar";
import Loginbar from "../components/Loginbar";

const Login = () => {
  return (
    <div>
      { /* should this nav bar be here? users shouldn't be able to access site without logging in! */ }
      { /* <Navbar /> */ }
      <Loginbar />
    </div>
  )
}

export default Login;