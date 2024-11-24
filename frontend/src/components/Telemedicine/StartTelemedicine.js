import React, { useState } from 'react';
import { Calendar, Clock, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

const StartTelemedicine = ({ onSessionStart }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [reason, setReason] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [availableDoctors] = useState([
    { id: 1, name: 'Dr. Smith', specialization: 'General Physician', rating: 4.8 },
    { id: 2, name: 'Dr. Johnson', specialization: 'Pediatrician', rating: 4.9 },
    { id: 3, name: 'Dr. Williams', specialization: 'Dermatologist', rating: 4.7 },
  ]);

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedDoctor || !selectedTime || !reason) {
      return;
    }

    // Validate and process the telemedicine session request
    const sessionData = {
      doctorId: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      reason: reason,
    };

    onSessionStart(sessionData);
    setShowSuccess(true);
    
    // Reset form after successful submission
    setTimeout(() => {
      setSelectedDate(new Date());
      setSelectedTime('');
      setSelectedDoctor('');
      setReason('');
      setShowSuccess(false);
    }, 3000);
  };

  const isFormValid = selectedDoctor && selectedTime && reason.trim().length > 0;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Schedule Telemedicine Session</h2>
      
      {showSuccess && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <AlertTitle className="text-green-800">Success!</AlertTitle>
          <AlertDescription className="text-green-700">
            Your telemedicine session has been scheduled successfully.
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Doctor Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Doctor</CardTitle>
              <CardDescription>Choose a healthcare provider for your consultation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedDoctor === doctor.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedDoctor(doctor.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{doctor.name}</h3>
                        <p className="text-sm text-gray-600">{doctor.specialization}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1 text-sm">{doctor.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Date and Time Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Date & Time</CardTitle>
              <CardDescription>Choose your preferred consultation time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                />
                
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reason for Consultation */}
        <Card>
          <CardHeader>
            <CardTitle>Reason for Consultation</CardTitle>
            <CardDescription>Please describe your symptoms or reason for the consultation</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter your symptoms or reason for consultation..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-32"
            />
          </CardContent>
        </Card>

        {/* Session Details Summary */}
        {isFormValid && (
          <Card>
            <CardHeader>
              <CardTitle>Session Details</CardTitle>
              <CardDescription>Review your telemedicine session details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Video className="w-4 h-4 mr-2" />
                  <span>
                    Consultation with {availableDoctors.find(d => d.id === selectedDoctor)?.name}
                  </span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    {selectedDate.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{selectedTime}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!isFormValid}
            className="px-6"
          >
            Schedule Session
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StartTelemedicine;