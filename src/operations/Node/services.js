import { fetchJSON } from '../../utils/fetch';
import { getToken } from '../User/services';

const HZN_ORGANIZATION = process.env.REACT_APP_ORGANIZATION;
const HZN_EXCHANGE_API_ENDPOINT = process.env.REACT_APP_EXCHANGE_API_ENDPOINT;
const HZN_EXCHANGE_API_NODE_DETAILS_ENDPOINT = `${HZN_EXCHANGE_API_ENDPOINT}/orgs/${HZN_ORGANIZATION}/node-details`;
const HZN_EXCHANGE_API_NODE_ENDPOINT = `${HZN_EXCHANGE_API_ENDPOINT}/orgs/${HZN_ORGANIZATION}/nodes`;

/**
 * Default options for the service.
 * Can be overwritten with the following:
 * {...options, method: 'POST'}
 */
const options = {
  method: 'GET',
  headers: {
    'Authorization': `Basic ${getToken()}`
  }
};

/**
 * formatNodeDetails
 * @param {array} nodes an array of nodes
 * @returns an object of nodes-related data
 */
const formatNodeDetails = nodes => ({
  nodes: nodes.map(node => ({
    ...node,
    heartbeatIntervalsMin: node.heartbeatIntervals.minInterval,
    heartbeatIntervalsMax: node.heartbeatIntervals.maxInterval,
    heartbeatIntervalsAdj: node.heartbeatIntervals.intervalAdjustment,
    numRegisteredServices: node.registeredServices ? node.registeredServices.length : 0,
    numErrors: node.errors ? node.errors.length : 0
  })),
  criticalCount: nodes.filter(({ errors }) => errors !== null && errors.length > 5).length, // DEV
  alarmingCount: nodes.filter(({ errors }) => errors !== null &&  errors.length > 0 && errors.length <= 5).length, // DEV
  runningCount: nodes.filter(({ errors }) => errors === null).length, // DEV
  totalCount: nodes.length
});

/**
 *  getNodeDetails
 * @returns all nodes (edge devices) with node errors, policy and status. Can be run by any user or agbot
 */
export function getNodeDetails() {
  return fetchJSON(`${HZN_EXCHANGE_API_NODE_DETAILS_ENDPOINT}`, options).then(formatNodeDetails);
}

/**
 *  getAllNodes
 * @returns all nodes (edge devices). Can be run by any user or agbot.
 */
export function getAllNodes() {
  return fetchJSON(`${HZN_EXCHANGE_API_NODE_ENDPOINT}`, options)
    .then(({ nodes }) => Object.keys(nodes).map(key => nodes[key]));
}

/**
 * getNodeById
 * @param {string} id of the node
 * @returns the node (edge device) with the specified id. Can be run by that node, a user, or an agbot.
 */
export function getNodeById(id) {
  return fetchJSON(`${HZN_EXCHANGE_API_NODE_ENDPOINT}/${id}`, options);
}
