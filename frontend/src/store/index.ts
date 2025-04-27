import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import healthReducer from './slices/healthSlice'
import appointmentReducer from './slices/appointmentSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    health: healthReducer,
    appointments: appointmentReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch