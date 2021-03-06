import React, { useState, useEffect } from "react";
import {
  fetchProperties,
  fetchPropertyDetails,
  getAvailablePropertyTypes
} from "../../api";
import Search from "../Search";
import SearchResults from "../SearchResults";
import SelectedProperties from "../SelectedProperties";
import PropertyTypes from "../PropertyTypes";
import Spinner from "../../utils/Spinner";

const Main = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [properties, setProperties] = useState([]);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [filteredPropertyTypes, setFilteredPropertyTypes] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearchTerm = () => {
    setSearchTerm("");
  };

  const handleCheckBoxClick = (property, checked) => {
    if (checked) {
      setSelectedProperties([...selectedProperties, property]);
    }
    if (selectedProperties.includes(property)) {
      const withoutDuplicate = selectedProperties.filter(
        (selectedProp) => selectedProp !== property
      );
      setSelectedProperties(withoutDuplicate);
    }
  };

  const getPropertyTypes = async () => {
    const result = await getAvailablePropertyTypes();
    setPropertyTypes(result.propertyTypes);
  };

  const searchProperties = async (e) => {
    e.preventDefault();
    if (searchTerm === "") {
      return alert("Please enter address");
    }
    setSearchTerm("");
    await fetchProperties({ address: searchTerm }).then((data) => {
      setSearchResult(data.properties);
    });
  };

  useEffect(() => {
    getPropertyTypes();
    setLoading(true);
    try {
      setError(false);
      let result = [];
      if (searchResult.length > 0) {
        searchResult.forEach((property) => {
          fetchPropertyDetails(property.id).then((res) => {
            setError(false);
            result = [...result, res.property];
            setProperties(result);
          });
        });
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, [searchResult]);

  console.log(searchResult);

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
            searchProperties={searchProperties}
          />
        </section>
        {error && (
          <div className="selected-section">Something went wrong ...</div>
        )}
        {loading ? (
          <div className="selected-section">
            <Spinner />
          </div>
        ) : (
          <>
            <section className="selected-section">
              <SelectedProperties
                properties={properties}
                title={"Selected properties"}
                selectedProperties={selectedProperties}
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
                filteredPropertyTypes={filteredPropertyTypes}
                title={"Search results"}
                handleCheckBoxClick={handleCheckBoxClick}
                headingColumns={[
                  "???",
                  "Address",
                  "Postcode",
                  "Property type",
                  "Number of rooms",
                  "Floor area (m2)"
                ]}
              />
            </section>
            <section className="types-section">
              <PropertyTypes
                propertyTypes={propertyTypes}
                properties={properties}
                setFilteredPropertyTypes={setFilteredPropertyTypes}
              />
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default Main;
