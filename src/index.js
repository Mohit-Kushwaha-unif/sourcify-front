import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import  store  from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById('root'));
const persistor = persistStore(store);

root.render(
  <GoogleOAuthProvider clientId="142988118915-21h8fmdhtar3qibj56c1n03eks610epe.apps.googleusercontent.com">
   
  <Provider store={store}>
     
  <BrowserRouter>
    <App />
  </BrowserRouter>
  
  </Provider>
  </GoogleOAuthProvider>
);

