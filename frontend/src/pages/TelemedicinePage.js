import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import TelemedicineSession from '../components/Telemedicine/TelemedicineSession';
import TelemedicineHistory from '../components/Telemedicine/TelemedicineHistory';
import StartTelemedicine from '../components/Telemedicine/StartTelemedicine';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Loader } from '../components/common/Loader';

const TelemedicinePage = () => {
  const dispatch = useDispatch();
  const [activeSession, setActiveSession] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  
  const { 
    loading, 
    error, 
    currentSession,
    sessionHistory 
  } = useSelector(state => state.telemedicine);
  
  const { subscription } = useSelector(state => state.profile);

  useEffect(() => {
    // Fetch telemedicine history when component mounts
    dispatch({ type: 'FETCH_TELEMEDICINE_HISTORY' });
  }, [dispatch]);

  const handleStartSession = (doctorId) => {
    if (subscription !== 'premium') {
      dispatch({
        type: 'SET_TELEMEDICINE_ERROR',
        payload: 'Telemedicine services are only available for Premium subscribers'
      });
      return;
    }
    dispatch({ type: 'START_TELEMEDICINE_SESSION', payload: doctorId });
  };

  const handleEndSession = () => {
    dispatch({ type: 'END_TELEMEDICINE_SESSION', payload: activeSession });
    setActiveSession(null);
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Telemedicine Services</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!currentSession && !showHistory && (
            <div className="space-y-4">
              <StartTelemedicine onStartSession={handleStartSession} />
              <Button
                onClick={() => setShowHistory(true)}
                variant="outline"
                className="mt-4"
              >
                View Session History
              </Button>
            </div>
          )}

          {currentSession && (
            <TelemedicineSession
              session={currentSession}
              onEndSession={handleEndSession}
            />
          )}

          {showHistory && (
            <div className="space-y-4">
              <TelemedicineHistory sessions={sessionHistory} />
              <Button
                onClick={() => setShowHistory(false)}
                variant="outline"
                className="mt-4"
              >
                Back to Telemedicine
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TelemedicinePage;