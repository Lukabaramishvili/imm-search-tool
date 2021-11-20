import React from "react";

const PropertyTypes = ({
  propertyTypes,
  properties,
  setFilteredPropertyTypes
}) => {
  const handlePropertyFilters = (types) => {
    const filteredProps = properties.filter((property) => {
      if (types === "All") {
        return properties;
      } else {
        return property.propertyType === types;
      }
    });
    setFilteredPropertyTypes(filteredProps);
  };

  return (
    <>
      <h2 className="property-title">Property types</h2>
      <ul className="property-list">
        <li>
          <button
            className="property-list-btn"
            onClick={(e) => {
              handlePropertyFilters("All");
            }}
          >
            All
          </button>
        </li>
        {propertyTypes.map((propertyFilter) => {
          return (
            <li key={propertyFilter.label}>
              <button
                className={`property-list-btn ${
                  propertyFilter.value ? ".selected" : null
                }`}
                onClick={(e) => {
                  handlePropertyFilters(propertyFilter.value);
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
