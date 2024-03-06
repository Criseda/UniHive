import React from 'react'
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import SavedItemList from '../components/SavedItemList';

const Saved_items = () => {
  return (
    <div>
      <Navbar />
      <Search />
      <SavedItemList />
    </div>
  )
}

export default Saved_items