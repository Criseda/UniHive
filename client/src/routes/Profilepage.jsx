import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Itemlist from "../components/Itemlist";
import Profilebar from "../components/Profilebar"

const Profilepage = () => {
    let { id } = useParams();

    return (
      <div>
        <Navbar />
        <Profilebar user_id={id}/>
        <Itemlist user_id={id}/>
      </div>
    );
  };
  
  export default Profilepage;