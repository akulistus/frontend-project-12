import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ProviderRollback, ErrorBoundary } from '@rollbar/react';

import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import i18next from './i18next';
import store from './services/index';
import router from './routes/router';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const rollbarConfig = {
  accessToken: '513cf3ff61864d08a5b5f6f8f36da12b',
  environment: 'production',
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProviderRollback config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ErrorBoundary>
    </ProviderRollback>
  </React.StrictMode>,
);
