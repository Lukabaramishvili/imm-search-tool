import React from "react";
import Table from "../Table/";

const SelectedProperties = ({ headingColumns, title, properties }) => {
  return (
    <Table title={title} headingColumns={headingColumns}>
      {/* {properties.map((property) => {
        return (
          <tr key={property.id}>
            <td data-heading={headingColumns[0]}>{property.address}</td>
            <td data-heading={headingColumns[1]}>{property.postcode}</td>
            <td data-heading={headingColumns[2]}>{property.propertyType}</td>
            <td data-heading={headingColumns[3]}>{property.numberOfRooms}</td>
            <td data-heading={headingColumns[4]}>{property.floorArea}</td>
          </tr>
        );
      })} */}
      Selected properties will go here
    </Table>
  );
};

export default SelectedProperties;
