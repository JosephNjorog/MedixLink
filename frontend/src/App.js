import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';
import DashboardPage from './pages/DashboardPage';
import AppointmentPage from './pages/AppointmentPage';
import HealthRecordsPage from './pages/HealthRecordsPage';
import InsurancePage from './pages/InsurancePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import TelemedicinePage from './pages/TelemedicinePage';
import TransactionPage from './pages/TransactionPage';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <AuthLayout>
            <Route exact path="/" component={DashboardPage} />
            <Route path="/appointments" component={AppointmentPage} />
            <Route path="/health-records" component={HealthRecordsPage} />
            <Route path="/insurance" component={InsurancePage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/telemedicine" component={TelemedicinePage} />
            <Route path="/transactions" component={TransactionPage} />
          </AuthLayout>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
