import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, MapPin, Phone, Mail, FileText } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AppointmentDetails = ({ appointmentId }) => {
  const [appointment, setAppointment] = useState({
    id: 1,
    doctorName: "Dr. Sarah Smith",
    specialization: "Cardiologist",
    date: "2024-11-26",
    time: "10:00 AM",
    location: "Main Hospital, Room 204",
    status: "upcoming",
    patientName: "John Doe",
    contactNumber: "+1 234 567 8900",
    email: "john.doe@example.com",
    reason: "Annual checkup",
    notes: "Patient has reported mild chest pain",
    previousVisit: "2024-10-15"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real application, you would fetch appointment details here
    // For now, we're using the static data above
  }, [appointmentId]);

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

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Appointment Details</h2>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Doctor Information</h3>
          
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-gray-500" />
            <div>
              <p className="font-medium text-gray-900">{appointment.doctorName}</p>
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

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Patient Information</h3>
          
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-gray-500" />
            <p className="text-gray-600">{appointment.patientName}</p>
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-gray-500" />
            <p className="text-gray-600">{appointment.contactNumber}</p>
          </div>

          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-500" />
            <p className="text-gray-600">{appointment.email}</p>
          </div>

          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Previous Visit</p>
              <p className="text-gray-600">{appointment.previousVisit}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Appointment Notes</h3>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <FileText className="w-5 h-5 text-gray-500 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Reason for Visit</p>
              <p className="text-gray-600">{appointment.reason}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <FileText className="w-5 h-5 text-gray-500 mt-1" />
            <div>
              <p className="text-sm text-gray-500">Additional Notes</p>
              <p className="text-gray-600">{appointment.notes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;