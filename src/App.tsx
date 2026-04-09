import { Outlet } from 'react-router-dom'
import { AppProvider } from './context/AppProvider'
import { ModalProvider } from './context/ModalContext'
import { ToastProvider } from './context/ToastProvider'
import { ToastContainer } from './components/shared/Toast'

function AppContent() {
  return <Outlet />;
}

function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <ModalProvider>
          <AppContent />
          <ToastContainer />
        </ModalProvider>
      </ToastProvider>
    </AppProvider>
  )
}

export default App
