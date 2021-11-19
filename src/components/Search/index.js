import React from "react";
import { fetchProperties } from "../../api";

const Search = ({
  searchTerm,
  setSearchTerm,
  handleClearSearchTerm,
  handleSearchTerm,
  setSearchResult
}) => {
  const searchProperties = (e) => {
    e.preventDefault();
    setSearchTerm("");
    fetchProperties({ address: searchTerm }).then((data) => {
      setSearchResult(data.properties);
    });
  };

  return (
    <form onSubmit={searchProperties}>
      <div className="search-wrapper">
        <label
          className="search-label"
          aria-label="search address"
          htmlFor="search-address"
        >
          Search
        </label>
        <span className="clearable">
          <i
            onClick={handleClearSearchTerm}
            className={`${
              searchTerm.length > 0 ? `clearable-clear` : "empty"
            } `}
          >
            &times;
          </i>
          <input
            className="search-input"
            value={searchTerm}
            onChange={handleSearchTerm}
            placeholder="Address"
          />
        </span>

        <div className="search-btn-wrapper">
          <button onClick={searchProperties} className="search-button">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
