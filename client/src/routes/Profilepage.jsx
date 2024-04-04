import React from "react";
import Navbar from "../components/Navbar";
import Itemlist from "../components/Itemlist";
import Prfilebar from "../components/Profilebar"

const Profilepage = () => {
    return (
      <div>
        <Navbar />
        <Prfilebar />
        <p className="mt-3 text-center">Post items</p>
        <Itemlist />
      </div>
    );
  };
  
  export default Profilepage;