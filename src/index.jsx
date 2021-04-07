import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App.jsx';
import './index.css';

import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import indexReducer from './indexReducer';
import indexSaga from './indexSaga';

import { applyPolyfills, defineCustomElements } from '@dell/dds/loader';

import reportWebVitals from './reportWebVitals';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(indexReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(indexSaga);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Suspense fallback={<dds-spinner size="large" type="overlay"></dds-spinner>}>
        <App />
      </Suspense>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);

const bootstrapDDS = () => defineCustomElements();

applyPolyfills().then(bootstrapDDS);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.debug);
