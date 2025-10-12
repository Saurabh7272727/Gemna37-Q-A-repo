import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StoreAdminContextCom } from './Admin/store/store.jsx';
import { Provider } from 'react-redux';

// redux config;
import store from './ReduxStore/store.js';

createRoot(document.getElementById('root')).render(
  <StoreAdminContextCom>
    <Provider store={store}>
      <App />
    </Provider >
  </StoreAdminContextCom>
)
