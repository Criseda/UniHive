import React from "react";

const Search = () => {
  return (
    <form className="container mt-3 mb-3">
      <div className="input-group justify-content-center">
        <div className="input-group-prepend">
          <select
            className="form-select"
            aria-label="Default select example"
            style={{ width: "150px !important" }} // Adjusted width here
          >
            <option value="0" selected>
              All items
            </option>
            <option value="1">Fixed Price</option>
            <option value="2">Auctions</option>
          </select>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Search all items"
          aria-label="Search"
          aria-describedby="button-addon2"
        />
        <button
          className="btn btn-outline-dark"
          type="button"
          id="button-addon2"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;
