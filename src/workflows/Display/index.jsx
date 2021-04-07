import React, { createRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectApp, selectShow } from './selectors';
import { displayModalRequisitionHide } from './commands';

import './index.css';

function DisplayDialog({ show, hide, app }) {
  const { label, device, description, version, requiredServices } = app || {};
  const dialog = createRef(null);

  // Create the listener to dialog's close button.
  useEffect(() => {
    const currentDialog = dialog.current;

    if (!currentDialog) return;

    currentDialog.addEventListener('dds-dialog:action', hide);

    return () => {
      currentDialog.removeEventListener('dds-dialog:action', hide);
    }
  }, [dialog, hide]);

  return (
    <dds-dialog open={show} actions="false" ref={dialog}>
      <div slot="dds-dialog-header">
        <h1 className="dds-header-text-3 app-name">{label} ({version})</h1>
      </div>
      <div slot="dds-dialog-body">
        <h2 className="dds-header-text-3 app-node">{device}</h2>
        <div className="more-info-description">
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
                  <th>Version Range</th>
                </tr>
              </thead>
              <tbody>
              {(requiredServices ?? []).map(({ label = 'N.A', arch = 'N.A', org = 'N.A', version = 'N.A', versionRange = 'N.A' }, index) => (
                <tr>
                  <td key={'display-dialog-required-services-label' + index}>{label}</td>
                  <td key={'display-dialog-required-services-arch' + index}>{arch || 'N.A'}</td>
                  <td key={'display-dialog-required-services-org' + index}>{org}</td>
                  <td key={'display-dialog-required-services-version' + index}>{version}</td>
                  <td key={'display-dialog-required-services-version-range' + index}>{versionRange}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </dds-dialog>
  );
}

export function mapStateToProps(state) {
  return {
    show: selectShow(state),
    app: selectApp(state)
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    hide: () => {
      dispatch(displayModalRequisitionHide());
    }
  };
}

DisplayDialog.propTypes = {
  hide: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayDialog);
