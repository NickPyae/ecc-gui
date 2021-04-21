import { fetchJSON } from '../../utils/fetch';
import { getToken } from '../User/services';

const HZN_ORGANIZATION = process.env.REACT_APP_ORGANIZATION;
const HZN_EXCHANGE_API_ENDPOINT = process.env.REACT_APP_EXCHANGE_API_ENDPOINT;
// XXX: For the prototype, the catalog represents all the different patterns available from all organisations.
const HZN_EXCHANGE_API_CATALOG_ENDPOINT = `${HZN_EXCHANGE_API_ENDPOINT}/catalog/${HZN_ORGANIZATION}/patterns`;

const HZN_AGENT_API_ENDPOINT = process.env.REACT_APP_AGENT_API_ENDPOINT;
const HZN_AGENT_NODE_API_ENDPOINT = `${HZN_AGENT_API_ENDPOINT}/node`;

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

// TODO: To handle errors for this one as OH API is returning a 404 for empty value.
export function getApplicationList() {
  return fetch(HZN_EXCHANGE_API_CATALOG_ENDPOINT, options)
    .then(response => response.json())
    .then(({ patterns }) => Object.keys(patterns).map(key => ({ ...patterns[key], patternName: key })));
};

export async function deployApplication({ id, patternName }) {
  const opts = {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json'
    }
  }

  const nodeToken = 'abc'; // DEV

  const nodeDefinition = {
    "token": nodeToken, // DEV
    "name": id,
    "nodeType": "device", // Only device for now
    "pattern": patternName,
    "arch": "amd64", // DEV
    "registeredServices": [],
    "userInput": [],
    "msgEndPoint": "",
    "publicKey": "ABCDEF", // DEV
    "heartbeatIntervals": {
      "minInterval": 10,
      "maxInterval": 120,
      "intervalAdjustment": 10
    }
  };

  // TODO: Create this node from user input when handling edition of nodes.
  // TODO: When implementing node creation, move this logic to the Node domain.
  const nodeConfig = {
    id,
    "organization": HZN_ORGANIZATION,
    "pattern": patternName,
    "name": id,
    "token": nodeToken
  };

  const nodePolicy = {
    "properties": [
      {
        "name": "tag",
        "value": "hellosally"
      },
      {
        "name": "openhorizon.allowPrivileged",
        "value": true
      }
    ]
  };

  const nodeState = {
    "state": "configured"
  };

  // XXX: createNode, initNode and updateNodePolicy should be handle with SDO.
  // XXX: The UI shouldn't require 'manual' registration of the node.
  const createNode = () => fetch(`${HZN_EXCHANGE_API_ENDPOINT}/orgs/${HZN_ORGANIZATION}/nodes/${nodeDefinition.name}`, { ...opts, method: 'PUT', body: JSON.stringify(nodeDefinition) });
  const initNode = () => fetch(HZN_AGENT_NODE_API_ENDPOINT, { ...opts, method: 'POST', body: JSON.stringify(nodeConfig) });
  const updateNodePolicy = () => fetch(`${HZN_AGENT_NODE_API_ENDPOINT}/policy`, { ...opts, method: 'POST', body: JSON.stringify(nodePolicy) });
  const registerNode = () => fetch(`${HZN_AGENT_NODE_API_ENDPOINT}/configstate`, { ...opts, method: 'PUT', body: JSON.stringify(nodeState) });

  await createNode();
  await initNode();
  await updateNodePolicy();
  return await registerNode();
}

// As of now, there is no need to pass any id.
// There is only 1 agent running registered with 1 exchange.
// This is a limitation from OH itself
export function uninstall() {
  return fetch(`${HZN_AGENT_NODE_API_ENDPOINT}?block=true&removeNode=true`, { ...options, method: 'DELETE' })
    .then(response => {
      if (response.status !== 204) {
        throw Error(response.statusText);
      }
      return response;
    });
}
