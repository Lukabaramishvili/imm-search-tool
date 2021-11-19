/**
 * Use the functions exported from this module as your "API" from which you
 * retrieve the data to display on the page. Do not modify this file.
 */

/**
 * Sleep for a given number of milliseconds.
 *
 * @param {number} delayInMilliseconds
 * @returns {Promise<void>}
 */
function wait(delayInMilliseconds) {
  return new Promise((resolve) => setTimeout(resolve, delayInMilliseconds));
}

/**
 * Generate a pseudo-random integer.
 *
 * @param {number} max
 * @returns {number}
 */
function randomInteger(max) {
  return Math.floor(Math.random() * max);
}

const sampleProperties = [
  {
    address: 'Forsmannstraße 5',
    id: '1f2da4ef-c1b7-4b4e-b172-59f19987e0be',
    propertyType: 'detached',
    numberOfRooms: 5,
    floorArea: 26,
    postcode: '28535',
  },
  {
    address: 'Steinstraße 12',
    id: '12737c5f-2d01-4c43-a0e7-f6f87608a6b2',
    numberOfRooms: 2,
    propertyType: 'terraced',
    floorArea: 23,
    postcode: '21573',
  },
  {
    address: 'Himmelstraße 2',
    id: '4e579e07-59ac-451f-a843-60ad4aba16c4',
    propertyType: 'flat',
    numberOfRooms: 8,
    floorArea: 55,
    postcode: '23897',
  },
  {
    address: 'Süntelstraße 11A',
    id: '0157f7cb-ecfc-46aa-a89e-fb16d72e1e5b',
    propertyType: 'flat',
    numberOfRooms: 1,
    floorArea: 94,
    postcode: '24849',
  },
  {
    address: 'Alte Schleuse 23',
    id: 'ec2505ca-c09b-4c49-9322-0f57874f15c9',
    propertyType: 'flat',
    numberOfRooms: 3,
    floorArea: 48,
    postcode: '25257',
  },
  {
    address: 'Stellinger Weg 45',
    id: '85262b2e-ce2b-4c21-befd-b40c9c2b5891',
    propertyType: 'detached',
    numberOfRooms: 3,
    floorArea: 28,
    postcode: '20775',
  },
  {
    address: 'Nagelsweg 22',
    id: '0d0e3436-1886-4e4d-9fde-a33378ed1758',
    propertyType: 'detached',
    numberOfRooms: 6,
    floorArea: 27,
    postcode: '20059',
  },
  {
    address: 'Zimmerpforte 3',
    id: '656a0748-cd17-4957-9b30-ffcc80ec8fe8',
    propertyType: 'semi-detached',
    numberOfRooms: 10,
    floorArea: 115,
    postcode: '27331',
  },
  {
    address: 'Hamburger Berg 19',
    id: 'f3b31b72-549a-41de-a3fb-8c373233d5b7',
    propertyType: 'terraced',
    numberOfRooms: 9,
    floorArea: 115,
    postcode: '29551',
  },
];

/**
 * @typedef {Object} PropertiesListEntry
 * @property {string} id - Unique identifier
 * @property {string} address - Street address
 * @property {string} postcode - Postcode
 * @property {string} propertyType - Property type
 */

/**
 * Retrieve a list of properties, optionally filtered by property-type. Since
 * this function simulates an API, it will take up to 500ms to complete.
 *
 * @param {object} options
 * @param {string} options.address
 * @param {string} [options.propertyType]
 * @returns {Promise<{ properties: PropertiesListEntry[] }>}
 */
async function fetchProperties({ address, propertyType }) {
  await wait(randomInteger(500));

  if (typeof address !== 'string' || address.trim() === '') {
    throw new Error('`address` must be provided');
  }

  if (Math.random() > 0.98) {
    throw new Error('An unexpected error occurred');
  }

  let propertiesFilteredByType = sampleProperties;

  if (propertyType !== undefined) {
    propertiesFilteredByType = propertiesFilteredByType.filter(
      (property) => property.propertyType === propertyType
    );
  }

  const propertiesFilteredByAddress = propertiesFilteredByType.filter((property) =>
    property.address.toLowerCase().includes(address.toLowerCase())
  );

  return {
    properties: propertiesFilteredByAddress.map(({ id, address, postcode, propertyType }) => ({
      id,
      address,
      postcode,
      propertyType,
    })),
  };
}

/**
 * @typedef {object} PropertyDetails
 * @property {string} id - Unique identifier
 * @property {string} address - Street address
 * @property {string} postcode - Postcode
 * @property {string} propertyType - Property type
 * @property {number} numberOfRooms - Number of rooms in the property
 * @property {number} floorArea - Floor area in square meters
 */

/**
 * Retrieve details for a specific property.
 *
 * @param {string} propertyId
 * @returns {Promise<{ property: PropertyDetails }>}
 */
async function fetchPropertyDetails(propertyId) {
  if (Math.random() > 0.99) {
    throw new Error('An unexpected error occurred');
  }

  await wait(randomInteger(500));
  const propertyToReturn = sampleProperties.find((property) => property.id === propertyId);

  return { property: propertyToReturn };
}

/**
 * @typedef {object} PropertyType
 * @property {string} label - The text to display
 * @property {string} value - The enum value assigned
 */

/**
 * Retrieve a list of all available property types.
 *
 * @returns {Promise<{ propertyTypes: PropertyType[] }>}
 */
async function getAvailablePropertyTypes() {
  await wait(randomInteger(500));

  return {
    propertyTypes: [
      { label: 'Semi-detached', value: 'semi-detached' },
      { label: 'Detached house', value: 'detached' },
      { label: 'Terraced house', value: 'terraced' },
      { label: 'Flat', value: 'flat' },
    ]
  };
}

export {
  fetchProperties, fetchPropertyDetails, getAvailablePropertyTypes,
};
