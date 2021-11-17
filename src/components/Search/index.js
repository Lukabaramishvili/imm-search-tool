import React from "react";

const Search = ({ searchTerm, handleClearSearchTerm, handleSearchTerm }) => {
  return (
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
          className={`${searchTerm.length > 0 ? `clearable-clear` : "empty"} `}
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

      {/* <input
        onClick={handleClearSearchTerm}
        className={`search-clear ${searchTerm.length === 0 ? `empty` : ""}`}
        aria-label="Clear search term"
        type="button"
        value="X"
      /> */}
      <div className="search-btn-wrapper">
        <button className="search-button">Search</button>
      </div>
    </div>
  );
};

export default Search;
