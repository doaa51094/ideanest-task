// index.js
import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { KindeProvider } from '@kinde-oss/kinde-auth-react';

const container = document.getElementById('root');
// Create a root.
const root = ReactDOMClient.createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <KindeProvider
        clientId={import.meta.env.VITE_KINDE_CLIENT_ID}
        domain={import.meta.env.VITE_KINDE_DOMAIN}
        redirectUri={import.meta.env.VITE_KINDE_REDIRECT_URL}
        logoutUri={import.meta.env.VITE_KINDE_LOGOUT_URL}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </KindeProvider>
    </BrowserRouter>
  </React.StrictMode>
);