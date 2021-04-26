import React, { createRef, useState, useEffect } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { selectApp, selectNodes, selectShow } from './selectors';
import { deployModalRequisitionHide } from './commands';
import { appDeploymentRequisition } from '../../operations/Application/commands';
import { nodeListRequisition } from '../../operations/Node/commands';

import './index.css';

function DeploymentDialog({ show, hide, nodes, getNodeList, app, deploy }) {
  const { label, device, description, version, services } = app || {};

  const dialog = createRef(null);
  const deployButton = createRef(null);

  const [appName, setAppName] = useState('ohagent');

  useEffect(() => {
    // TODO: Find a more elegant way.
    if (nodes) return;
    getNodeList();
  });

  function handleDeployment() {
    deploy({ ...app, id: appName });
    hide();
  }

  // Create the listener to dialog's close button.
  useEffect(() => {
    const currentButton = deployButton.current;

    if (!currentButton) return;

    currentButton.addEventListener('click', handleDeployment);

    return () => {
      currentButton.removeEventListener('click', handleDeployment);
    };
  });

  useEffect(() => {
    const currentDialog = dialog.current;

    if (!currentDialog) return;

    currentDialog.addEventListener('dds-dialog:action', hide);

    return () => {
      currentDialog.removeEventListener('dds-dialog:action', hide);
    };
  }, [dialog, hide]);

  const handleNameInputChange = value => {
    setAppName(value);
  };

  return (
    <dds-dialog open={show} actions="false" ref={dialog}>
      <div slot="dds-dialog-header">
        <h1 className="dds-header-text-1">{label}</h1>
      </div>
      <div slot="dds-dialog-body">
        <p>{description}</p>
        <div className="services">
          <h3 className="dds-header-text-4">Dependencies</h3>
          <table>
            <thead>
              <tr>
                <th>Label</th>
                <th>Arch</th>
                <th>Org</th>
                <th>Version</th>
              </tr>
            </thead>
            <tbody>
            {(services ?? []).map(({ serviceUrl = 'N.A', serviceArch = 'N.A', serviceOrgid = 'N.A', serviceVersions = 'N.A' }, index) => (
              <tr key={index}>
                <td key={'deploy-dialog-required-services-label' + index}>{serviceUrl}</td>
                <td key={'deploy-dialog-required-services-arch' + index}>{serviceArch || 'N.A'}</td>
                <td key={'deploy-dialog-required-services-org' + index}>{serviceOrgid}</td>
                <td key={'deploy-dialog-required-services-version' + index}>{serviceVersions[0]?.version}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
        <form>
          <input type="text" placeholder="Enter a name for your app" onChange={({ target }) => handleNameInputChange(target.value)} required />
          <label htmlFor="nodes">Choose a node where to deploy the app:</label>
          <select id="nodes" name="nodes">
            {(nodes ?? []).map(({ name }, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>
        </form>
        <div className="submit-button-wrapper">
          <dds-button type="primary" ref={deployButton}>Deploy</dds-button>
        </div>
      </div>
    </dds-dialog>
  );
}

export function mapStateToProps(state) {
  return {
    show: selectShow(state),
    nodes: selectNodes(state),
    app: selectApp(state)
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    getNodeList: () => {
      dispatch(nodeListRequisition());
    },
    hide: () => {
      dispatch(deployModalRequisitionHide());
    },
    deploy: artifact => {
      dispatch(appDeploymentRequisition(artifact));
    }
  };
}

DeploymentDialog.propTypes = {
  getNodeList: PropTypes.func.isRequired,
  hide: PropTypes.func.isRequired,
  deploy: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DeploymentDialog);
