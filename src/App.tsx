import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import { ModalProvider } from './context/ModalContext'
import { IntroPage } from './components/pages/IntroPage'

function AppContent() {
  const navigate = useNavigate();

  useEffect(() => {
    //navigate to intro view on first load
    navigate('/intro');
  }, [])

  return <Outlet />;
}

function App() {
  return (
    <AppProvider>
      <ModalProvider>
        <AppContent />
      </ModalProvider>
    </AppProvider>
  )
}

export default App
