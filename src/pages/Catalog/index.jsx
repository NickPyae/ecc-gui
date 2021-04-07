import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './index.css';

import { appListRequisition } from '../../operations/Application/commands';

import DeploymentDialog from '../../workflows/Deploy';
import { deployModalRequisitionShow } from '../../workflows/Deploy/commands';

import DisplayDialog from '../../workflows/Display';
import { displayModalRequisitionShow } from '../../workflows/Display/commands';
import { selectInstalledApps, selectAvailableApps } from './selectors';

export function CatalogPage({ installedApps = [], availableApps = [], getAppList, showDisplayModal, showDeployModal }) {
  useEffect(() => {
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
            {installedApps.map((app, index) => (
              <dds-card header="true" footer="true" key={'installed-app-card' + index}>
                { index % 2 !== 0 ?
                  <dds-progress size="large" variant="info" value="80">
                    <span slot="label-top-text">Installing</span>
                    <span slot="label-bottom-text">2 minutes remaining.</span>
                  </dds-progress>
                : '' }
                <div slot="header">
                  <h1 className="dds-header-text-3 app-name">{app.label}</h1>
                  <h2 className="dds-header-text-3 app-node">{app.device}</h2>
                </div>
                <div slot="body">
                  <p className="dds-body-text">{app.description}</p>
                </div>
                <div slot="footer">
                  <dds-button type="tertiary" disabled={index % 2 !== 0} onClick={() => showDisplayModal(app)}>More info</dds-button>
                  <dds-button type="tertiary" disabled={index % 2 !== 0}>Uninstall</dds-button>
                </div>
              </dds-card>
            ))}
          </div>
        </dds-tab-panel>
        <dds-tab-panel slot="panel">
          <div className="card-list">
            {availableApps.map((app, index) => (
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
    availableApps: selectAvailableApps(state)
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
    getAppList: () => {
      dispatch(appListRequisition());
    }
  };
}

CatalogPage.propTypes = {
  getAppList: PropTypes.func.isRequired,
  showDisplayModal: PropTypes.func.isRequired,
  showDeployModal: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(CatalogPage);
