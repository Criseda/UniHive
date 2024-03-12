import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Itemlist from "../components/Itemlist";

const Home = () => {
  
  return (
    <div>
      <Navbar />
      <Search />
      <Itemlist />
    </div>
  );
};

export default Home;
