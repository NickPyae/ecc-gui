import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.css';

import { nodeListRequisition } from '../../operations/Node/commands';
import { appListRequisition, appUninstallRequisition } from '../../operations/Application/commands';

import DeploymentDialog from '../../workflows/Deploy';
import { deployModalRequisitionShow } from '../../workflows/Deploy/commands';

import DisplayDialog from '../../workflows/Display';
import { displayModalRequisitionShow } from '../../workflows/Display/commands';
import { selectInstalledApps, selectAvailableApps, selectPendingUninstall } from './selectors';

export function CatalogPage(
  {
    installedApps,
    availableApps,
    getNodeList,
    getAppList,
    deleteApp,
    showDisplayModal,
    showDeployModal,
    pendingUninstall
  }) {
  // TODO: Find a more elegant way.
  useEffect(() => {
    if (installedApps) return;
    getNodeList();
  });

  // TODO: Find a more elegant way.
  useEffect(() => {
    if (availableApps) return;
    getAppList();
  });

  return (
    <div className="catalog">
      <DisplayDialog></DisplayDialog>
      <DeploymentDialog></DeploymentDialog>
      <dds-tabs type="secondary">
        <dds-tab slot="header">Installed</dds-tab>
        <dds-tab slot="header">Available Apps</dds-tab>
        <dds-tab-panel slot="panel">
          <div className="card-list">
            {(installedApps ?? []).map((app, index) => (
              <dds-card header="true" footer="true" key={'installed-app-card' + index}>
                { pendingUninstall ?
                  <dds-progress value="25" variant="info" size="large" type="indeterminate">
                    <span slot="label-top-text">Uninstalling...</span>
                    {/* <span slot="label-bottom-text"></span> */}
                  </dds-progress>
                : '' }
                <div slot="header">
                  <h1 className="dds-header-text-3 app-name">{app.name}</h1>
                  {/* <h2 className="dds-header-text-3 app-node">{app.name}</h2> */}
                </div>
                <div slot="body">
                  <p className="dds-body-text">{app.pattern}</p>
                </div>
                <div slot="footer">
                  <dds-button type="tertiary" onClick={() => showDisplayModal(app)}>More info</dds-button>
                  <dds-button type="tertiary" onClick={() => deleteApp(app)}>Uninstall</dds-button>
                </div>
              </dds-card>
            ))}
          </div>
        </dds-tab-panel>
        <dds-tab-panel slot="panel">
          <div className="card-list">
            {(availableApps ?? []).map((app, index) => (
              <dds-card header="true" footer="true" key={'available-app-card' + index}>
                <div slot="header">
                  <h1 className="dds-header-text-3 app-name">{app.label}</h1>
                </div>
                <div slot="body">
                  <p className="dds-body-text">{app.description}</p>
                </div>
                <div slot="footer">
                  <dds-button type="tertiary" onClick={() => showDeployModal(app)}>Install</dds-button>
                </div>
              </dds-card>
            ))}
            </div>
          </dds-tab-panel>
      </dds-tabs>
    </div>
  );
}

export function mapStateToProps(state) {
  return {
    installedApps: selectInstalledApps(state),
    availableApps: selectAvailableApps(state),
    pendingUninstall: selectPendingUninstall(state)
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    showDisplayModal: app => {
      dispatch(displayModalRequisitionShow(app));
    },
    showDeployModal: app => {
      dispatch(deployModalRequisitionShow(app));
    },
    getNodeList: () => {
      dispatch(nodeListRequisition());
    },
    getAppList: () => {
      dispatch(appListRequisition());
    },
    deleteApp: app => {
      dispatch(appUninstallRequisition(app));
    }
  };
}

CatalogPage.propTypes = {
  getNodeList: PropTypes.func.isRequired,
  getAppList: PropTypes.func.isRequired,
  deleteApp: PropTypes.func.isRequired,
  showDisplayModal: PropTypes.func.isRequired,
  showDeployModal: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage);
