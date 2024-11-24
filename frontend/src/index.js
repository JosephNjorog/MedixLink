import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import './assets/styles/main.css';
import subscriptionReducer from './redux/slices/subscriptionSlice';
import authReducer from './redux/slices/authSlice';

const store = configureStore({
  reducer: {
    subscription: subscriptionReducer,
    auth: authReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);