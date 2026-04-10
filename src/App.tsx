import { Outlet } from 'react-router-dom';
import { ToastContainer } from './components/shared';
import { AppProvider } from './context/AppProvider';
import { ModalProvider } from './context/ModalContext';
import { ToastProvider } from './context/ToastProvider';

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
  );
}

export default App;
