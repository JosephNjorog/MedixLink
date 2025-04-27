import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// Import reducers
import appointmentReducer from './reducers/appointmentReducer';
import healthRecordReducer from './reducers/healthRecordReducer';
import transactionReducer from './reducers/transactionReducer';
import profileReducer from './reducers/profileReducer';

const rootReducer = combineReducers({
  appointments: appointmentReducer,
  healthRecords: healthRecordReducer,
  transactions: transactionReducer,
  profile: profileReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;