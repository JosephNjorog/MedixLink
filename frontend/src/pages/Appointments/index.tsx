import { useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

interface AppointmentFormData {
  doctorId: string
  specialization: string
  date: Date | null
  time: Date | null
  type: 'in-person' | 'telemedicine'
  notes: string
}

const specializations = [
  'General Practice',
  'Cardiology',
  'Dermatology',
  'Neurology',
  'Pediatrics',
  'Psychiatry',
  'Orthopedics',
]

const Appointments = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const { appointments } = useSelector((state: RootState) => state.appointments)
  const [formData, setFormData] = useState<AppointmentFormData>({
    doctorId: '',
    specialization: '',
    date: null,
    time: null,
    type: 'in-person',
    notes: '',
  })

  const handleInputChange = (field: keyof AppointmentFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = () => {
    // TODO: Implement appointment creation
    setOpenDialog(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'primary'
      case 'completed':
        return 'success'
      case 'cancelled':
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Appointments</Typography>
        <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
          Book Appointment
        </Button>
      </Box>

      <Grid container spacing={3}>
        {appointments.map(appointment => (
          <Grid item xs={12} md={6} key={appointment.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">{appointment.doctorName}</Typography>
                  <Chip
                    label={appointment.status}
                    color={getStatusColor(appointment.status)}
                  />
                </Box>
                <Typography color="textSecondary" gutterBottom>
                  {appointment.specialization}
                </Typography>
                <Typography variant="body1">
                  Date: {new Date(appointment.date).toLocaleDateString()}
                </Typography>
                <Typography variant="body1">
                  Time: {new Date(appointment.time).toLocaleTimeString()}
                </Typography>
                <Typography variant="body1">Type: {appointment.type}</Typography>
                {appointment.notes && (
                  <Typography variant="body2" color="textSecondary" mt={1}>
                    Notes: {appointment.notes}
                  </Typography>
                )}
                {appointment.type === 'telemedicine' && appointment.meetingLink && (
                  <Button
                    variant="contained"
                    color="primary"
                    href={appointment.meetingLink}
                    target="_blank"
                    sx={{ mt: 2 }}
                  >
                    Join Meeting
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Book New Appointment</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Specialization"
                  value={formData.specialization}
                  onChange={e => handleInputChange('specialization', e.target.value)}
                >
                  {specializations.map(spec => (
                    <MenuItem key={spec} value={spec}>
                      {spec}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date"
                    value={formData.date}
                    onChange={date => handleInputChange('date', date)}
                    sx={{ width: '100%' }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Time"
                    value={formData.time}
                    onChange={time => handleInputChange('time', time)}
                    sx={{ width: '100%' }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Appointment Type"
                  value={formData.type}
                  onChange={e => handleInputChange('type', e.target.value)}
                >
                  <MenuItem value="in-person">In-Person</MenuItem>
                  <MenuItem value="telemedicine">Telemedicine</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes"
                  multiline
                  rows={3}
                  value={formData.notes}
                  onChange={e => handleInputChange('notes', e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Book Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Appointments