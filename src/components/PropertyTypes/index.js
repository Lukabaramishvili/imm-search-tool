import React from "react";

const PropertyTypes = ({
  propertyTypes,
  propertyType,
  setPropertyType,
  searchProperties,
  searchTerm
}) => {
  // const handlePropertyFilters = (types) => {
  //   const filteredProps = properties.filter((property) => {
  //     if (types === "All") {
  //       return properties;
  //     } else {
  //       return property.propertyType === types;
  //     }
  //   });
  //   setFilteredPropertyTypes(filteredProps);
  // };

  return (
    <>
      <h2 className="property-title">Property types</h2>
      <ul className="property-list">
        <li>
          <button
            className={`property-list-btn ${
              propertyType === "All" ? "selected" : null
            }`}
            onClick={() => {
              setPropertyType("All");
              searchProperties(searchTerm);
            }}
          >
            All
          </button>
        </li>
        {propertyTypes.map((propertyFilter) => {
          return (
            <li key={propertyFilter.value}>
              <button
                className={`property-list-btn ${
                  propertyType === propertyFilter.value ? "selected" : null
                }`}
                onClick={() => {
                  setPropertyType(propertyFilter.value);
                  searchProperties(searchTerm, propertyFilter.value);
                }}
              >
                {propertyFilter.label}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default PropertyTypes;
