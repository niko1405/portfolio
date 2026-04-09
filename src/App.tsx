import { Outlet, useNavigate } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import { AppProvider } from './context/AppContext'
import { ModalProvider } from './context/ModalContext'
import { ToastProvider } from './context/ToastContext'
import { ToastContainer } from './components/shared/Toast'

function AppContent() {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    //navigate to intro view on first load
    navigate('/intro');
  }, [])

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
