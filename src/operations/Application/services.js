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
    "registeredServices": [ // HARDCODE FOR NOW - TODO
      {
        "url": "dellsg/com.eos2git.cec.lab.emc.hellosally",
        "numAgreements": 1,
        "policy": "{\"header\":{\"name\":\"Policy for dellsg_com.eos2git.cec.lab.emc.hellosally\",\"version\":\"2.0\"},\"apiSpec\":[{\"specRef\":\"com.eos2git.cec.lab.emc.hellosally\",\"organization\":\"dellsg\",\"version\":\"0.0.1\",\"exclusiveAccess\":true,\"arch\":\"amd64\"}],\"valueExchange\":{},\"dataVerification\":{\"metering\":{}},\"proposalRejection\":{},\"properties\":[{\"name\":\"cpus\",\"value\":\"4\"},{\"name\":\"ram\",\"value\":\"7961\"}],\"ha_group\":{},\"nodeHealth\":{}}",
        "properties": [
          {
            "name": "version",
            "value": "0.0.1",
            "propType": "version",
            "op": "in"
          },
          {
            "name": "cpus",
            "value": "4",
            "propType": "string",
            "op": "in"
          },
          {
            "name": "ram",
            "value": "7961",
            "propType": "string",
            "op": "in"
          },
          {
            "name": "arch",
            "value": "amd64",
            "propType": "string",
            "op": "in"
          }
        ]
      }
    ],
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

  // HARDCODED TODO
  const userInput = [
    {
      "serviceOrgid": "dellsg",
      "serviceUrl": "com.eos2git.cec.lab.emc.hellosally",
      "serviceArch": "amd64",
      "serviceVersionRange": "[0.0.0,INFINITY)",
      "inputs": [
        {
          "name": "KUIPER_IP",
          "value": "192.168.18.63"
        },
        {
          "name": "KUIPER_PORT",
          "value": "48075"
        },
        {
          "name": "INFLUXDB_IP",
          "value": "192.168.1.152"
        },
        {
          "name": "INFLUXDB_PORT",
          "value": "8086"
        },
        {
          "name": "INFLUXDB_TOKEN",
          "value": "m8Btf1vDt5vDx6N7f_Yy0RxwvG0wxzvyjslMZ0XxmREtEpZWBsAhUcd5N020NRt2ZltldQlUiIpLD8Km3hcKjQ=="
        },
        {
          "name": "INFLUXDB_CLOUD_TOKEN",
          "value": "CU4e0jPsdqeSVRL5niynNFJt7pRKG5Xx6ssnPp2Vt4Azd7LFjK0D7Ofg1ElAnfnfW9iJldgLUqDPoFXAbzZ1LA=="
        },
        {
          "name": "BUCKET_NAME",
          "value": "hello-sally"
        },
        {
          "name": "REDIS_IP",
          "value": "192.168.18.63"
        },
        {
          "name": "REDIS_PORT",
          "value": "6379"
        }
      ]
    }
  ]

  // XXX: createNode, initNode and updateNodePolicy should be handle with SDO.
  // XXX: The UI shouldn't require 'manual' registration of the node.
  const createNode = () => fetch(`${HZN_EXCHANGE_API_ENDPOINT}/orgs/${HZN_ORGANIZATION}/nodes/${nodeDefinition.name}`, { ...opts, method: 'PUT', body: JSON.stringify(nodeDefinition) });
  const initNode = () => fetch(HZN_AGENT_NODE_API_ENDPOINT, { ...opts, method: 'POST', body: JSON.stringify(nodeConfig) });
  const updateNodePolicy = () => fetch(`${HZN_AGENT_NODE_API_ENDPOINT}/policy`, { ...opts, method: 'POST', body: JSON.stringify(nodePolicy) });
  const registerNode = () => fetch(`${HZN_AGENT_NODE_API_ENDPOINT}/configstate`, { ...opts, method: 'PUT', body: JSON.stringify(nodeState) });
  const updateNodeUserInput = () => fetch(`${HZN_AGENT_NODE_API_ENDPOINT}/userinput`, { ...opts, method: 'POST', body: JSON.stringify(userInput) });

  await createNode();
  await initNode();
  await updateNodePolicy();
  await registerNode();
  return await updateNodeUserInput();
}

// As of now, there is no need to pass any id.
// There is only 1 agent running registered with 1 exchange.
// This is a limitation from OH itself
export function uninstall() {
  return fetch(`${HZN_AGENT_NODE_API_ENDPOINT}?block=true&deepClean=true`, { ...options, method: 'DELETE' })
    .then(response => {
      if (response.status !== 204) {
        throw Error(response.statusText);
      }
      return response;
    });
}
