import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './styles/print.css'
import './styles/darkMode.css'
import { DarkModeProvider } from './hooks/useDarkMode'
import { registerServiceWorker } from './utils/pwa'
import App from './App.tsx'
import ErrorBoundary from './components/ErrorBoundary'

// Register PWA service worker for offline support
registerServiceWorker()

createRoot(document.getElementById('root')!).render(
  <BrowserRouter
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  >
    <DarkModeProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </DarkModeProvider>
  </BrowserRouter>,
)
