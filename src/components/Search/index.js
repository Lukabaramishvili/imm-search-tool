import React from "react";

const Search = ({
  searchTerm,
  propertyType,
  handleClearSearchTerm,
  handleSearchTerm,
  searchProperties
}) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        searchProperties(searchTerm, propertyType);
      }}
    >
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
          <button className="search-button">Search</button>
        </div>
      </div>
    </form>
  );
};

export default Search;
