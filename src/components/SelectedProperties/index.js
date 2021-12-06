import React from "react";
import Table from "../Table/";

const SelectedProperties = ({ headingColumns, title, selectedProperties }) => {
  return (
    <>
      {selectedProperties.length ? (
        <Table title={title} headingColumns={headingColumns}>
          {selectedProperties.map((property) => {
            return (
              <tr key={property.id}>
                <td data-heading={headingColumns[0]}>{property.address}</td>
                <td data-heading={headingColumns[1]}>{property.postcode}</td>
                <td data-heading={headingColumns[2]}>
                  {property.propertyType}
                </td>
                <td data-heading={headingColumns[3]}>
                  {property.numberOfRooms}
                </td>
                <td data-heading={headingColumns[4]}>{property.floorArea}</td>
              </tr>
            );
          })}
        </Table>
      ) : (
        <>
          <h3>Selected properties section</h3>
          <p className="selected-prop-message">No properties selected yet</p>
        </>
      )}
    </>
  );
};

export default SelectedProperties;
