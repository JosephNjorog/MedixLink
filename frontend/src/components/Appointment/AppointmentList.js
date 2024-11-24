import React, { useEffect, useState } from 'react';
import { Calendar, Clock, User, MapPin } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctorName: "Dr. Sarah Smith",
      specialization: "Cardiologist",
      date: "2024-11-26",
      time: "10:00 AM",
      location: "Main Hospital, Room 204",
      status: "upcoming"
    },
    {
      id: 2,
      doctorName: "Dr. James Wilson",
      specialization: "Dermatologist",
      date: "2024-11-27",
      time: "2:30 PM",
      location: "Medical Center, Room 105",
      status: "completed"
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real application, you would fetch appointments here
    // For now, we're using the static data above
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Your Appointments</h2>
      
      <div className="grid gap-4">
        {appointments.map((appointment) => (
          <div 
            key={appointment.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <div>
                    <h3 className="font-medium text-gray-900">{appointment.doctorName}</h3>
                    <p className="text-sm text-gray-500">{appointment.specialization}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <p className="text-gray-600">{appointment.date}</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <p className="text-gray-600">{appointment.time}</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <p className="text-gray-600">{appointment.location}</p>
                </div>
              </div>
              
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </span>
            </div>
            
            <div className="mt-4 flex space-x-3">
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                onClick={() => {/* Handle reschedule */}}
              >
                Reschedule
              </button>
              <button 
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
                onClick={() => {/* Handle cancel */}}
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentList;