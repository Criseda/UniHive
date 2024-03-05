import React from "react";
import Navbar from "../components/Navbar";
import Itemlist from "../components/Itemlist";
import Prfilebar from "../components/Profilebar"

const Profilepage = () => {
    return (
      <div>
        <Navbar />
        <Prfilebar />
        <Itemlist />
      </div>
    );
  };
  
  export default Profilepage;