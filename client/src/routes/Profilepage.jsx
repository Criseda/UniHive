import React from "react";
import Navbar from "../components/Navbar";
import Itemlist from "../components/Itemlist";
import Profilebar from "../components/Profilebar"

const Profilepage = () => {
    return (
      <div>
        <Navbar />
        <Profilebar />
        <h4 className="pt-3 text-center h4 font-weight-bold">Posted items</h4>
        <Itemlist />
      </div>
    );
  };
  
  export default Profilepage;