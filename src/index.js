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
		clientId="73e38fda7e5948ce98bbe82c8bad5c59"
		domain="https://ideanest2588.kinde.com"
		redirectUri="https://ideanest-task-one.vercel.app"
		logoutUri="https://ideanest-task-one.vercel.app"
	>
      <Provider store={store}>
        <App />
      </Provider>
      </KindeProvider>
    </BrowserRouter>
  </React.StrictMode>
);