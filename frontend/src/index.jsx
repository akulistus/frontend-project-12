import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import i18next from './i18next';

import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './services/index';
import router from './routes/router';

import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
