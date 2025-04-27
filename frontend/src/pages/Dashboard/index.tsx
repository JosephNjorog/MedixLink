import { useEffect } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
} from '@mui/material'
import {
  CalendarMonth,
  LocalHospital,
  Medication,
  MonitorHeart,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

interface QuickActionCardProps {
  title: string
  description: string
  icon: React.ReactNode
  path: string
}

const QuickActionCard = ({ title, description, icon, path }: QuickActionCardProps) => {
  const navigate = useNavigate()

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" alignItems="center" mb={2}>
          {icon}
          <Typography variant="h6" component="div" ml={1}>
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {description}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(path)}
          fullWidth
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  )
}

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.user)
  const { appointments, loading: appointmentsLoading } = useSelector(
    (state: RootState) => state.appointments
  )
  const { metrics, loading: healthLoading } = useSelector(
    (state: RootState) => state.health
  )

  useEffect(() => {
    // Fetch initial data
    // TODO: Implement data fetching
  }, [])

  if (appointmentsLoading || healthLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    )
  }

  const quickActions = [
    {
      title: 'Appointments',
      description: 'Schedule or view your upcoming medical appointments',
      icon: <CalendarMonth color="primary" fontSize="large" />,
      path: '/appointments',
    },
    {
      title: 'Health Records',
      description: 'Access your medical history and test results',
      icon: <LocalHospital color="primary" fontSize="large" />,
      path: '/health-records',
    },
    {
      title: 'Medications',
      description: 'View and manage your current medications',
      icon: <Medication color="primary" fontSize="large" />,
      path: '/health-records',
    },
    {
      title: 'Health Metrics',
      description: 'Track your vital signs and health metrics',
      icon: <MonitorHeart color="primary" fontSize="large" />,
      path: '/health-records',
    },
  ]

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome back, {user?.name}
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Here's an overview of your health status and quick actions.
      </Typography>

      <Grid container spacing={3} mt={2}>
        {quickActions.map((action, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <QuickActionCard {...action} />
          </Grid>
        ))}
      </Grid>

      {/* Additional dashboard sections can be added here */}
    </Box>
  )
}

export default Dashboard