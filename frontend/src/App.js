import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';
// import LoginPage from './pages/LoginPage';
// import DashboardPage from './pages/DashboardPage';
import PackageSelection from './components/Transactions/PackageSelection';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/packages" element={<PackageSelection />} />
        </Route>
        
        {/* Main app routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashboardPage />} />
          {/* Other routes will be added as we develop features */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;