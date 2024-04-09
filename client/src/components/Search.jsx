import React from "react";

const Search = () => {
  return (
    <form className="container mt-3 mb-3">
      <div className="input-group justify-content-center">
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
