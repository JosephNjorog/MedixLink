import { useEffect, useRef, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import {
  Mic,
  MicOff,
  Videocam,
  VideocamOff,
  Chat as ChatIcon,
  Send,
} from '@mui/icons-material'

interface VideoChatProps {
  doctorId: string
  patientId: string
  onEndCall: () => void
}

interface ChatMessage {
  sender: string
  text: string
  timestamp: Date
}

const VideoChat = ({ doctorId, patientId, onEndCall }: VideoChatProps) => {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const [showChat, setShowChat] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  
  useEffect(() => {
    // Initialize WebRTC connection
    const initializeMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        })
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream
        }
        
        // TODO: Implement peer connection and signaling
      } catch (error) {
        console.error('Error accessing media devices:', error)
      }
    }
    
    initializeMedia()
    
    return () => {
      // Cleanup media streams
      if (localVideoRef.current?.srcObject) {
        const tracks = (localVideoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach(track => track.stop())
      }
    }
  }, [])
  
  const handleToggleAudio = () => {
    if (localVideoRef.current?.srcObject) {
      const audioTrack = (localVideoRef.current.srcObject as MediaStream)
        .getAudioTracks()[0]
      audioTrack.enabled = !audioTrack.enabled
      setIsMuted(!isMuted)
    }
  }
  
  const handleToggleVideo = () => {
    if (localVideoRef.current?.srcObject) {
      const videoTrack = (localVideoRef.current.srcObject as MediaStream)
        .getVideoTracks()[0]
      videoTrack.enabled = !videoTrack.enabled
      setIsVideoEnabled(!isVideoEnabled)
    }
  }
  
  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: ChatMessage = {
        sender: patientId, // or doctorId depending on user role
        text: message,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, newMessage])
      setMessage('')
      // TODO: Implement message sending through data channel
    }
  }
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={showChat ? 8 : 12}>
        <Card>
          <CardContent>
            <Box display="flex" flexDirection="column" gap={2}>
              <Box position="relative" width="100%" height="400px" bgcolor="black">
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
                <Box
                  position="absolute"
                  bottom={16}
                  right={16}
                  width="150px"
                  height="100px"
                  bgcolor="black"
                  border={1}
                  borderColor="grey.500"
                >
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
              </Box>
              
              <Box display="flex" justifyContent="center" gap={2}>
                <IconButton onClick={handleToggleAudio} color={isMuted ? 'error' : 'primary'}>
                  {isMuted ? <MicOff /> : <Mic />}
                </IconButton>
                <IconButton onClick={handleToggleVideo} color={isVideoEnabled ? 'primary' : 'error'}>
                  {isVideoEnabled ? <Videocam /> : <VideocamOff />}
                </IconButton>
                <IconButton onClick={() => setShowChat(!showChat)} color="primary">
                  <ChatIcon />
                </IconButton>
                <Button variant="contained" color="error" onClick={onEndCall}>
                  End Call
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      
      {showChat && (
        <Grid item xs={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Chat
              </Typography>
              <Box
                sx={{
                  height: '300px',
                  overflowY: 'auto',
                  mb: 2,
                  p: 1,
                  bgcolor: 'grey.100',
                  borderRadius: 1
                }}
              >
                {messages.map((msg, index) => (
                  <Box
                    key={index}
                    sx={{
                      mb: 1,
                      p: 1,
                      bgcolor: msg.sender === patientId ? 'primary.light' : 'white',
                      borderRadius: 1,
                      maxWidth: '80%',
                      ml: msg.sender === patientId ? 'auto' : 0
                    }}
                  >
                    <Typography variant="body2">{msg.text}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {msg.timestamp.toLocaleTimeString()}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Box display="flex" gap={1}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <IconButton color="primary" onClick={handleSendMessage}>
                  <Send />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  )
}

export default VideoChat