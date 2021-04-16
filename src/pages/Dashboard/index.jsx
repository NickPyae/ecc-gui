import React, { useEffect, Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { defineCustomElements } from '@revolist/revogrid/loader';
import { RevoGrid } from '@revolist/revogrid-react';

// DEV
import { columns } from './config';

import './index.css';
import { nodeDetailsRequisition } from '../../operations/Node/commands';
import { selectNodeDetails } from './selectors';

import { isEmpty } from '../../utils/objects';

export function DashboardPage({ nodeDetails, getNodeDetails }) {
  const { criticalCount, alarmingCount, runningCount, totalCount, nodes } = nodeDetails || {};
  const statusCards = [
    {
      title: 'Running nodes',
      type: 'success',
      count: runningCount
    },
    {
      title: 'Critical nodes',
      type: 'danger',
      count: criticalCount
    },
    {
      title: 'Alarming nodes',
      type: 'warning',
      count: alarmingCount
    },
    {
      title: 'Total nodes',
      type: '',
      count: totalCount
    }
  ];

  useEffect(() => {
    defineCustomElements();

    if (nodeDetails != null && !isEmpty(nodeDetails)) return;
    getNodeDetails();
  });

  return (
    <div className="dashboard">
      <div className="dashboard-status">
        {statusCards.map(({ type, title, count }) => (
          <dds-card status={type} type="inline" header footer="false" key={title}>
              <div slot="header">
                <h1 className="dds-header-text-1">{title}</h1>
              </div>
              <div slot="body">
                <p className="dds-display-text-1">{count}</p>
              </div>
            </dds-card>
        ))}
      </div>
      <div className="dashboard-status-table">
        <Suspense fallback={<dds-spinner size="large" type="overlay"></dds-spinner>}>
          <RevoGrid
            theme="compact"
            columns={columns}
            source={nodes}
            onAfterEdit={event => this.afterEdit(event)}
          />
        </Suspense>
      </div>
    </div>
  );
}

export function mapStateToProps(state) {
  return {
    nodeDetails: selectNodeDetails(state)
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    getNodeDetails: () => {
      dispatch(nodeDetailsRequisition());
    }
  };
}

DashboardPage.propTypes = {
  getNodeDetails: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
