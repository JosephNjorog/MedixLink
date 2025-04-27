import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Appointment {
  id: string
  patientId: string
  doctorId: string
  doctorName: string
  specialization: string
  date: string
  time: string
  type: 'in-person' | 'telemedicine'
  status: 'scheduled' | 'completed' | 'cancelled'
  notes?: string
  meetingLink?: string
}

interface AppointmentState {
  appointments: Appointment[]
  loading: boolean
  error: string | null
}

const initialState: AppointmentState = {
  appointments: [],
  loading: false,
  error: null,
}

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setAppointments: (state, action: PayloadAction<Appointment[]>) => {
      state.appointments = action.payload
      state.error = null
    },
    addAppointment: (state, action: PayloadAction<Appointment>) => {
      state.appointments.push(action.payload)
    },
    updateAppointment: (state, action: PayloadAction<Appointment>) => {
      const index = state.appointments.findIndex(apt => apt.id === action.payload.id)
      if (index !== -1) {
        state.appointments[index] = action.payload
      }
    },
    cancelAppointment: (state, action: PayloadAction<string>) => {
      const index = state.appointments.findIndex(apt => apt.id === action.payload)
      if (index !== -1) {
        state.appointments[index].status = 'cancelled'
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const {
  setAppointments,
  addAppointment,
  updateAppointment,
  cancelAppointment,
  setLoading,
  setError,
} = appointmentSlice.actions

export default appointmentSlice.reducer