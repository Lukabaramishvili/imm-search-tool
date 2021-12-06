import React from "react";
import Table from "../Table";

const SearchResults = ({
  properties,
  handleCheckBoxClick,
  headingColumns,
  title
}) => {
  return (
    <>
      <Table headingColumns={headingColumns} title={title}>
        {properties.map((property) => {
          return (
            <tr key={property.id}>
              <td data-heading={headingColumns[0]}>
                <input
                  onChange={(e) =>
                    handleCheckBoxClick(property, e.target.checked)
                  }
                  type="checkbox"
                  id={property.id}
                />
              </td>
              <td data-heading={headingColumns[1]}>{property.address}</td>
              <td data-heading={headingColumns[2]}>{property.postcode}</td>
              <td data-heading={headingColumns[3]}>{property.propertyType}</td>
              <td data-heading={headingColumns[4]}>{property.numberOfRooms}</td>
              <td data-heading={headingColumns[5]}>{property.floorArea}</td>
            </tr>
          );
        })}
      </Table>
    </>
  );
};

export default SearchResults;
