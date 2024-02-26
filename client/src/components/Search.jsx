import React from "react";

const Search = () => {
  return (
    <form className="mt-3 mb-3">
      <div className="col-md-6 mx-auto">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
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
      </div>
    </form>
  );
};

export default Search;
