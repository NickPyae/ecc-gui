export const columns = [
  {
    "name": "Name",
    "prop": "name",
    "rowDrag": true,
    "sortable": true,
    "order": "asc",
    "pin": "colPinStart",
    "size": 200,
    "autoSize": true
  },
  {
    "name": "General",
    "children": [
      {
        "sortable": true,
        "name": "Owner",
        "prop": "owner"
      },
      {
        "name": "Type",
        "prop": "nodeType",
        "sortable": true
      },
      {
        "name": "Architecture",
        "prop": "arch",
        "size": 150,
        "sortable": true
      }
    ]
  },
  {
    "name": "Summary",
    "children": [
      {
        "name": "Registered Services",
        "prop": "numRegisteredServices",
        "type": "number",
        "size": 200,
        "sortable": true
      },
      {
        "name": "Last Update",
        "prop": "lastUpdatedNode",
        "size": 200,
        "sortable": true
      },
      {
        "name": "Last Error",
        "prop": "lastUpdatedNodeError",
        "size": 200,
        "sortable": true
      },
      {
        "name": "Last Policy Update",
        "prop": "lastUpdatedNodePolicy",
        "size": 200,
        "sortable": true
      }
    ]
  },
  {
    "name": "Status",
    "children": [
      {
        "name": "Last Status Update",
        "prop": "lastUpdatedNodeStatus",
        "size": 200,
        "sortable": true
      },
      {
        "sortable": true,
        "name": "Last Heartbeat",
        "prop": "lastHeartbeat",
        "pin": "colPinStart",
        "size": 150
      },
      {
        "name": "Errors",
        "prop": "numErrors",
        "type": "number",
        "sortable": true
      },
      {
        "name": "Heartbeat Interval Adjustement",
        "prop": "heartbeatIntervalAdjustement",
        "type": "number",
        "size": 250,
        "sortable": true
      },
      {
        "name": "Heartbeat Minimum Interval",
        "prop": "heartbeatIntervalAdjustement",
        "type": "number",
        "size": 250,
        "sortable": true
      },
      {
        "name": "Heartbeat Maximum Interval",
        "prop": "heartbeatIntervalAdjustement",
        "type": "number",
        "size": 250,
        "sortable": true
      }
    ]
  }
];
