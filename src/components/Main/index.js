import React, { useState, useEffect } from "react";
import { fetchPropertyDetails } from "../../api";
import Search from "../Search";
import SearchResults from "../SearchResults";
import SelectedProperties from "../SelectedProperties";
import PropertyTypes from "../PropertyTypes";

const Main = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [properties, setProperties] = useState([]);
  const [searchResult, setSearchResult] = useState("");

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearchTerm = () => {
    setSearchTerm("");
  };

  let arr = [];

  useEffect(() => {
    if (searchResult.length > 0) {
      searchResult.forEach((property) => {
        fetchPropertyDetails(property.id).then((res) => {
          arr = [...arr, res.property];
          setProperties(arr);
        });
      });
    }
  }, [searchResult]);

  return (
    <>
      <main className="main-container">
        <section className="search-section">
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClearSearchTerm={handleClearSearchTerm}
            handleSearchTerm={handleSearchTerm}
            setSearchResult={setSearchResult}
          />
        </section>
        <section className="selected-section">
          <SelectedProperties
            properties={properties}
            title={"Selected properties"}
            headingColumns={[
              "Address",
              "Postcode",
              "Property type",
              "Number of rooms",
              "Floor area (m2)"
            ]}
          />
        </section>
        <section className="table-section">
          <SearchResults
            properties={properties}
            title={"Search results"}
            headingColumns={[
              "✓",
              "Address",
              "Postcode",
              "Property type",
              "Number of rooms",
              "Floor area (m2)"
            ]}
          />
        </section>
        <section className="types-section">
          <PropertyTypes />
        </section>
      </main>
    </>
  );
};

export default Main;
