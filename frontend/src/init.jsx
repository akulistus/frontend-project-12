import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as ProviderRollback, ErrorBoundary } from '@rollbar/react';
import filter from 'leo-profanity';

import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index';
import store from './services/index';
import router from './routes/router';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const runApp = () => {
  const en = filter.list();
  filter.loadDictionary('ru');
  filter.add(en);

  i18n
    .use(initReactI18next)
    .init({
      lng: 'ru',
      resources,
    });

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_APIKEY,
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
};

export default runApp;
