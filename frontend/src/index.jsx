// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { Provider as ProviderRollback, ErrorBoundary } from '@rollbar/react'
// import i18next from './i18next';

// import { RouterProvider } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './services/index';
// import router from './routes/router';

// import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const rollbarConfig = {
//   accessToken: '513cf3ff61864d08a5b5f6f8f36da12b',
//   environment: 'production',
// }

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <ProviderRollback config={rollbarConfig}>
//       <ErrorBoundary>
//         <Provider store={store}>
//           <RouterProvider router={router} />
//         </Provider>
//       </ErrorBoundary>
//     </ProviderRollback>
//   </React.StrictMode>
// );


import React from 'react'
import { Provider, ErrorBoundary } from '@rollbar/react' // Provider imports 'rollbar'

const rollbarConfig = {
  accessToken: '513cf3ff61864d08a5b5f6f8f36da12b',
  environment: 'testenv',
}

function TestError() {
  const a = null
  return a.hello()
}

// Provider instantiates Rollbar client instance handling any uncaught errors or unhandled promises in the browser
// ErrorBoundary catches all React errors in the tree below and logs them to Rollbar
export default function App() {
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <TestError />
      </ErrorBoundary>
    </Provider>
  )
}