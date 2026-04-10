import { Outlet } from 'react-router-dom';
import { ToastContainer } from './components/shared';
import { AppProvider, ModalProvider, ToastProvider } from './context';

/**
 * Renders the currently active route content.
 */
function AppContent() {
  return <Outlet />;
}

/**
 * Root app composition with all global providers.
 */
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
