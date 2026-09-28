import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ROUTES } from './routes/routes';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EnquiryMiniBanner from './components/EnquiryMiniBanner';

// Main layout wrapper to conditionally render navigation bars based on current route
const MainLayout = () => {
  const location = useLocation();

  // Pages that render as standalone portals without the public customer navbar/footer
  const isStandalonePortal = 
    location.pathname === ROUTES.LOGIN || 
    location.pathname === ROUTES.ADMIN_LOGIN ||
    location.pathname === ROUTES.ADMIN_DASHBOARD ||
    location.pathname.startsWith('/admin');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isStandalonePortal && <Navbar />}
      
      <main style={{ flexGrow: 1 }}>
        <AppRoutes />
      </main>

      {!isStandalonePortal && <Footer />}
      {!isStandalonePortal && location.pathname !== ROUTES.ADMIN_DASHBOARD && <EnquiryMiniBanner />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;
