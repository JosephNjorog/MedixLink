import React, { useState, useEffect } from 'react';
import { Video, Mic, MicOff, VideoOff, MessageSquare, PhoneOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const TelemedicineSession = ({ sessionId, doctorId, onEndSession }) => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [sessionStatus, setSessionStatus] = useState('connecting');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize telemedicine session
    const initializeSession = async () => {
      try {
        // Here you would typically:
        // 1. Connect to your WebRTC service
        // 2. Initialize peer connection
        // 3. Set up media streams
        setSessionStatus('connected');
      } catch (err) {
        setError('Failed to initialize video session. Please check your connection.');
        setSessionStatus('error');
      }
    };

    initializeSession();

    // Cleanup function
    return () => {
      // Cleanup WebRTC connections and streams
    };
  }, [sessionId]);

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
    // Implement actual microphone toggle logic here
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    // Implement actual video toggle logic here
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: 'patient', timestamp: new Date() }]);
      setNewMessage('');
    }
  };

  const handleEndSession = () => {
    // Implement session cleanup logic here
    onEndSession();
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col h-screen max-h-screen bg-gray-100">
      {/* Video Area */}
      <div className="flex-grow grid grid-cols-2 gap-4 p-4">
        <div className="bg-gray-800 rounded-lg relative">
          {/* Doctor's video stream */}
          <div className="absolute bottom-4 right-4 text-white">Dr. Smith</div>
        </div>
        <div className="bg-gray-800 rounded-lg relative">
          {/* Patient's video stream */}
          <div className="absolute bottom-4 right-4 text-white">You</div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-white p-4 flex justify-center items-center gap-4 border-t">
        <Button
          onClick={toggleMic}
          variant={isMicOn ? 'default' : 'destructive'}
          size="lg"
          className="rounded-full"
        >
          {isMicOn ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
        </Button>

        <Button
          onClick={toggleVideo}
          variant={isVideoOn ? 'default' : 'destructive'}
          size="lg"
          className="rounded-full"
        >
          {isVideoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
        </Button>

        <Button
          onClick={handleEndSession}
          variant="destructive"
          size="lg"
          className="rounded-full"
        >
          <PhoneOff className="h-6 w-6" />
        </Button>
      </div>

      {/* Chat Sidebar */}
      <div className="absolute right-0 top-0 bottom-0 w-64 bg-white border-l shadow-lg">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Session Chat</h3>
          </div>
          
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[80%] ${
                  message.sender === 'patient'
                    ? 'ml-auto bg-blue-500 text-white'
                    : 'bg-gray-100'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <span className="text-xs opacity-75">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow p-2 border rounded-lg"
              />
              <Button type="submit" size="icon">
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TelemedicineSession;