import React from 'react'
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Saved_item_list from '../components/Saved_item_list';

const Saved_items = () => {
  return (
    <div>
      <Navbar />
      <Search />
      <Saved_item_list />
    </div>
  )
}

export default Saved_items