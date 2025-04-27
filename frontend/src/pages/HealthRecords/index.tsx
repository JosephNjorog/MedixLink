import { useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material'
import { Download, Visibility } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`health-records-tabpanel-${index}`}
      aria-labelledby={`health-records-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

const HealthRecords = () => {
  const [tabValue, setTabValue] = useState(0)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<any>(null)
  const { records, medications, metrics } = useSelector((state: RootState) => state.health)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleViewRecord = (record: any) => {
    setSelectedRecord(record)
    setOpenDialog(true)
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Health Records
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="health records tabs">
          <Tab label="Medical Records" />
          <Tab label="Medications" />
          <Tab label="Health Metrics" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {records.map(record => (
            <Grid item xs={12} key={record.id}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">{record.type}</Typography>
                    <Box>
                      <IconButton onClick={() => handleViewRecord(record)}>
                        <Visibility />
                      </IconButton>
                      {record.attachments && (
                        <IconButton>
                          <Download />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                  <Typography color="textSecondary">
                    Date: {new Date(record.date).toLocaleDateString()}
                  </Typography>
                  <Typography color="textSecondary">Doctor: {record.doctor}</Typography>
                  <Typography color="textSecondary">Facility: {record.facility}</Typography>
                  {record.summary && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Summary: {record.summary}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <List>
          {medications.map(medication => (
            <ListItem key={medication.id}>
              <ListItemText
                primary={medication.name}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="textPrimary">
                      Dosage: {medication.dosage}
                    </Typography>
                    <br />
                    <Typography component="span" variant="body2">
                      Frequency: {medication.frequency}
                    </Typography>
                  </>
                }
              />
              <ListItemSecondaryAction>
                <Chip
                  label={`Until ${new Date(medication.endDate || '').toLocaleDateString()}`}
                  color="primary"
                  variant="outlined"
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          {metrics.map(metric => (
            <Grid item xs={12} sm={6} md={4} key={metric.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{metric.type}</Typography>
                  <Typography variant="h4" color="primary">
                    {metric.value} {metric.unit}
                  </Typography>
                  <Typography color="textSecondary">
                    {new Date(metric.timestamp).toLocaleString()}
                  </Typography>
                  <Chip
                    label={metric.source}
                    color={metric.source === 'wearable' ? 'secondary' : 'default'}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Record Details</DialogTitle>
        <DialogContent>
          {selectedRecord && (
            <Box sx={{ mt: 2 }}>
              <TextField
                label="Type"
                value={selectedRecord.type}
                fullWidth
                disabled
                sx={{ mb: 2 }}
              />
              <TextField
                label="Date"
                value={new Date(selectedRecord.date).toLocaleDateString()}
                fullWidth
                disabled
                sx={{ mb: 2 }}
              />
              <TextField
                label="Doctor"
                value={selectedRecord.doctor}
                fullWidth
                disabled
                sx={{ mb: 2 }}
              />
              <TextField
                label="Facility"
                value={selectedRecord.facility}
                fullWidth
                disabled
                sx={{ mb: 2 }}
              />
              <TextField
                label="Description"
                value={selectedRecord.description}
                fullWidth
                multiline
                rows={4}
                disabled
                sx={{ mb: 2 }}
              />
              {selectedRecord.summary && (
                <TextField
                  label="AI-Generated Summary"
                  value={selectedRecord.summary}
                  fullWidth
                  multiline
                  rows={3}
                  disabled
                />
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
          {selectedRecord?.attachments && (
            <Button startIcon={<Download />} color="primary">
              Download Records
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default HealthRecords