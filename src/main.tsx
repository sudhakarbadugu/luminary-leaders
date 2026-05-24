import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import './styles/print.css'
import './styles/darkMode.css'
import { DarkModeProvider } from './hooks/useDarkMode'
import { registerServiceWorker } from './utils/pwa'
import App from './App.tsx'

// Register PWA service worker for offline support
registerServiceWorker()

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </BrowserRouter>,
)
