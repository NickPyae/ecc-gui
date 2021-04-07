import mockData from './mock';

// const HZN_EXCHANGE_API_ENDPOINT = process.env.REACT_APP_EXCHANGE_API_ENDPOINT;
// const HZN_ORGANIZATION = process.env.REACT_APP_ORGANIZATION;
// const HZN_EXCHANGE_API_NODE_DETAILS_ENDPOINT = `${HZN_EXCHANGE_API_ENDPOINT}/orgs/${HZN_ORGANIZATION}/node-details`;
// const HZN_EXCHANGE_API_NODE_ENDPOINT = `${HZN_EXCHANGE_API_ENDPOINT}/orgs/${HZN_ORGANIZATION}/nodes`;

/**
 *  getNodeDetails
 * @returns all nodes (edge devices) with node errors, policy and status. Can be run by any user or agbot
 */
export function getNodeDetails() {
  return {
    nodes: mockData,
    criticalCount: mockData.filter(({ numErrors }) => numErrors > 5).length, // DEV
    alarmingCount: mockData.filter(({ numErrors }) => numErrors > 0 && numErrors <= 5).length, // DEV
    runningCount: mockData.filter(({ numErrors }) => numErrors === 0).length, // DEV
    totalCount: mockData.length
  };
}

/**
 *  getAllNodes
 * @returns all nodes (edge devices). Can be run by any user or agbot.
 */
export function getAllNodes() {
  return mockData;
}

/**
 * getNodeById
 * @param {string} id of the node
 * @returns the node (edge device) with the specified id. Can be run by that node, a user, or an agbot.
 */
export function getNodeById(id) {
  return mockData.filter(({ name }) => name === id);
}
