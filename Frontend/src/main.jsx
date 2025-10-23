import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StoreAdminContextCom } from './Admin/store/store.jsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// redux config;
import store, { persistor } from './ReduxStore/store.js';

createRoot(document.getElementById('root')).render(
  <StoreAdminContextCom>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StoreAdminContextCom>
)
