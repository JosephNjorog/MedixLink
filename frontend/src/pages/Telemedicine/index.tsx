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
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Chip,
  IconButton,
} from '@mui/material'
import {
  Videocam,
  Chat,
  Schedule,
  Star,
} from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import VideoChat from '../../components/Telemedicine/VideoChat'

interface Doctor {
  id: string
  name: string
  specialization: string
  rating: number
  available: boolean
  imageUrl?: string
}

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'General Practice',
    rating: 4.8,
    available: true,
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Cardiology',
    rating: 4.9,
    available: false,
  },
  {
    id: '3',
    name: 'Dr. Emily Williams',
    specialization: 'Pediatrics',
    rating: 4.7,
    available: true,
  },
]

const Telemedicine = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [isInCall, setIsInCall] = useState(false)
  const { user } = useSelector((state: RootState) => state.user)

  const handleStartConsultation = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setOpenDialog(true)
  }

  const handleJoinMeeting = () => {
    setOpenDialog(false)
    setIsInCall(true)
  }

  const handleEndCall = () => {
    setIsInCall(false)
    setSelectedDoctor(null)
  }

  return (
    <Box>
      {isInCall && selectedDoctor ? (
        <Box mb={3}>
          <Typography variant="h4" gutterBottom>
            Consultation with {selectedDoctor.name}
          </Typography>
          <VideoChat
            doctorId={selectedDoctor.id}
            patientId={user?.id || 'patient'}
            onEndCall={handleEndCall}
          />
        </Box>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Telemedicine Consultations
          </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Available Doctors
              </Typography>
              <List>
                {mockDoctors.map(doctor => (
                  <ListItem
                    key={doctor.id}
                    secondaryAction={
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Videocam />}
                        disabled={!doctor.available}
                        onClick={() => handleStartConsultation(doctor)}
                      >
                        {doctor.available ? 'Start Consultation' : 'Unavailable'}
                      </Button>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar src={doctor.imageUrl}>
                        {doctor.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center">
                          {doctor.name}
                          <Chip
                            size="small"
                            label={`${doctor.rating} ★`}
                            color="primary"
                            sx={{ ml: 1 }}
                          />
                        </Box>
                      }
                      secondary={doctor.specialization}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                How It Works
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Box textAlign="center">
                    <Schedule fontSize="large" color="primary" />
                    <Typography variant="h6" sx={{ mt: 1 }}>
                      Schedule
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Book an appointment with your preferred doctor
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box textAlign="center">
                    <Videocam fontSize="large" color="primary" />
                    <Typography variant="h6" sx={{ mt: 1 }}>
                      Connect
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Join the video consultation at scheduled time
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box textAlign="center">
                    <Chat fontSize="large" color="primary" />
                    <Typography variant="h6" sx={{ mt: 1 }}>
                      Follow-up
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Receive prescriptions and follow-up instructions
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Consultation Guidelines
              </Typography>
              <Typography variant="body2" paragraph>
                • Ensure you have a stable internet connection
              </Typography>
              <Typography variant="body2" paragraph>
                • Find a quiet, well-lit private space
              </Typography>
              <Typography variant="body2" paragraph>
                • Have your medical history ready
              </Typography>
              <Typography variant="body2" paragraph>
                • Test your camera and microphone before the session
              </Typography>
              <Typography variant="body2" paragraph>
                • Be ready 5 minutes before your scheduled time
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Start Consultation</DialogTitle>
        <DialogContent>
          {selectedDoctor && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                You are about to start a video consultation with:
              </Typography>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar src={selectedDoctor.imageUrl} sx={{ mr: 2 }}>
                  {selectedDoctor.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6">{selectedDoctor.name}</Typography>
                  <Typography color="textSecondary">
                    {selectedDoctor.specialization}
                  </Typography>
                </Box>
              </Box>
              <TextField
                fullWidth
                label="Consultation Notes"
                multiline
                rows={4}
                placeholder="Briefly describe your symptoms or concerns..."
                sx={{ mb: 2 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleJoinMeeting}
            variant="contained"
            color="primary"
            startIcon={<Videocam />}
          >
            Join Consultation
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Telemedicine