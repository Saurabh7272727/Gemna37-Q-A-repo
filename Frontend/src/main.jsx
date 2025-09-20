import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StoreAdminContextCom } from './Admin/store/store.jsx';

createRoot(document.getElementById('root')).render(
  <StoreAdminContextCom>
    <App />
  </StoreAdminContextCom>

)
