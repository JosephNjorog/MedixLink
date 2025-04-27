import { Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Appointments from './pages/Appointments'
import HealthRecords from './pages/HealthRecords'
import Telemedicine from './pages/Telemedicine'
import Insurance from './pages/Insurance'
import Settings from './pages/Settings'

const App = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/health-records" element={<HealthRecords />} />
          <Route path="/telemedicine" element={<Telemedicine />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Box>
  )
}

export default App