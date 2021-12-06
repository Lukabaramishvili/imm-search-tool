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
  const [properties, setProperties] = useState(null);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [propertyType, setPropertyType] = useState("All");
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearchTerm = () => {
    setSearchTerm("");
    setProperties(null);
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

  useEffect(() => {
    getPropertyTypes();
  }, []);

  const searchProperties = async (address, propertyType) => {
    try {
      setLoading(true);
      setError(false);
      let response;
      if (searchTerm === "") {
        return alert("Please enter address");
      }
      if (propertyType === "All") {
        response = await fetchProperties({ address: address });
      } else {
        response = await fetchProperties({
          address: address,
          propertyType: propertyType
        });
      }
      const allProperties = response.properties.map((property) =>
        fetchPropertyDetails(property.id)
      );
      Promise.all(allProperties)
        .then((data) =>
          data.map((item) => {
            return item.property;
          })
        )
        .then((values) => setProperties(values));
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  console.log(properties);

  return (
    <>
      <main className="main-container">
        {error && (
          <div className="selected-section">Something went wrong ...</div>
        )}
        <section className="search-section">
          <Search
            searchTerm={searchTerm}
            propertyType={propertyType}
            setSearchTerm={setSearchTerm}
            handleClearSearchTerm={handleClearSearchTerm}
            handleSearchTerm={handleSearchTerm}
            searchProperties={searchProperties}
          />
        </section>
        <section className="selected-section">
          <SelectedProperties
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
        {loading ? (
          <div className="selected-section">
            <Spinner />
          </div>
        ) : (
          <section className="table-section">
            {properties ? (
              <SearchResults
                properties={properties}
                propertyType={propertyType}
                title={"Search results"}
                handleCheckBoxClick={handleCheckBoxClick}
                headingColumns={[
                  "✓",
                  "Address",
                  "Postcode",
                  "Property type",
                  "Number of rooms",
                  "Floor area (m2)"
                ]}
              />
            ) : (
              <h3>Please search for an address to view details</h3>
            )}
          </section>
        )}
        <section className="types-section">
          <PropertyTypes
            searchTerm={searchTerm}
            searchProperties={searchProperties}
            propertyTypes={propertyTypes}
            propertyType={propertyType}
            setPropertyType={setPropertyType}
          />
        </section>
      </main>
    </>
  );
};

export default Main;
