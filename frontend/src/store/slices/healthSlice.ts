import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface HealthRecord {
  id: string
  date: string
  type: string
  description: string
  doctor: string
  facility: string
  attachments?: string[]
  summary?: string
}

interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
  startDate: string
  endDate?: string
  instructions: string
}

interface HealthMetric {
  id: string
  type: string
  value: number
  unit: string
  timestamp: string
  source: 'manual' | 'wearable'
}

interface HealthState {
  records: HealthRecord[]
  medications: Medication[]
  metrics: HealthMetric[]
  loading: boolean
  error: string | null
}

const initialState: HealthState = {
  records: [],
  medications: [],
  metrics: [],
  loading: false,
  error: null,
}

const healthSlice = createSlice({
  name: 'health',
  initialState,
  reducers: {
    setRecords: (state, action: PayloadAction<HealthRecord[]>) => {
      state.records = action.payload
      state.error = null
    },
    addRecord: (state, action: PayloadAction<HealthRecord>) => {
      state.records.push(action.payload)
    },
    updateRecord: (state, action: PayloadAction<HealthRecord>) => {
      const index = state.records.findIndex(record => record.id === action.payload.id)
      if (index !== -1) {
        state.records[index] = action.payload
      }
    },
    setMedications: (state, action: PayloadAction<Medication[]>) => {
      state.medications = action.payload
    },
    addMedication: (state, action: PayloadAction<Medication>) => {
      state.medications.push(action.payload)
    },
    updateMedication: (state, action: PayloadAction<Medication>) => {
      const index = state.medications.findIndex(med => med.id === action.payload.id)
      if (index !== -1) {
        state.medications[index] = action.payload
      }
    },
    setMetrics: (state, action: PayloadAction<HealthMetric[]>) => {
      state.metrics = action.payload
    },
    addMetric: (state, action: PayloadAction<HealthMetric>) => {
      state.metrics.push(action.payload)
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
  setRecords,
  addRecord,
  updateRecord,
  setMedications,
  addMedication,
  updateMedication,
  setMetrics,
  addMetric,
  setLoading,
  setError,
} = healthSlice.actions

export default healthSlice.reducer