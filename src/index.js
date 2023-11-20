import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter } from "react-router-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId="142988118915-21h8fmdhtar3qibj56c1n03eks610epe.apps.googleusercontent.com">

    <Provider store={store}>

      <BrowserRouter>
        <App />
      </BrowserRouter>

    </Provider>
  </GoogleOAuthProvider>
);

serviceWorkerRegistration.register();
