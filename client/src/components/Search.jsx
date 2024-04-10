
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Search = () => {

  let { option, query } = useParams();

  const [option_input, setOption] = useState(option?option:"0");
  const [query_input, setInput] = useState(query?query:"");
  const navigate = useNavigate();

  const handleSearchQuery = () => {
    if (query_input != undefined && query_input != null && query_input != "") {
      navigate(`/results/${option_input}/${query_input}`);
    }
    //
    // submit will refresh the page, regardless of if we navigate()
    //
  };

  return (
    <form className="container mt-3 mb-3" onSubmit={ () => handleSearchQuery() }>
      <div className="input-group justify-content-center">
        <div className="input-group-prepend">
          <select
            className="form-select"
            aria-label="Filter"
            style={{ width: "150px !important" }} // Adjusted width here
            onInput={ e => setOption(e.target.value) }
            defaultValue={option_input}
          >
            <option value="0">All items</option>
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
          onInput={ e => setInput(e.target.value) }
          defaultValue={query_input}
        />
        <button
          className="btn btn-outline-dark"
          type="button"
          id="button-addon2"
          onClick={ () => handleSearchQuery() }
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;
