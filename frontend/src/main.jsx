import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext.jsx';
import { FlashProvider } from "./context/FlashContext";
import { LoadingProvider } from './context/LoadingContext.jsx';
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FlashProvider>
          <LoadingProvider>
            <App />
          </LoadingProvider>
        </FlashProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
