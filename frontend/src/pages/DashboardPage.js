import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MainLayout } from '../components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar } from 'lucide-react';
import StatsCard from '../components/Dashboard/StatsCard';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { appointments } = useSelector((state) => state.appointments);
  const { healthRecords } = useSelector((state) => state.healthRecords);

  useEffect(() => {
    // Fetch necessary data when component mounts
    // dispatch(fetchAppointments());
    // dispatch(fetchHealthRecords());
    // dispatch(fetchInsuranceInfo());
    //dispatch(fetchhealthdata()))
  }, [dispatch]);

  const healthData = [
    { month: 'Jan', bp: 120, weight: 70, glucose: 95 },
    { month: 'Feb', bp: 125, weight: 71, glucose: 98 },
    { month: 'Mar', bp: 118, weight: 69, glucose: 92 },
    // Add more data points
  ];

  const upcomingAppointments = appointments?.slice(0, 3) || [];

  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Welcome back, {user?.name}</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Upcoming Appointments"
            value={appointments?.length || 0}
            icon={<Calendar className="h-6 w-6" />}
            trend="+2 this week"
          />
          <StatsCard
            title="Health Records"
            value={healthRecords?.length || 0}
            icon={<Calendar className="h-6 w-6" />}
            trend="Last updated today"
          />
          <StatsCard
            title="Insurance Balance"
            value="$2,450"
            icon={<Calendar className="h-6 w-6" />}
            trend="Coverage: 85%"
          />
          <StatsCard
            title="Medications"
            value="4 Active"
            icon={<Calendar className="h-6 w-6" />}
            trend="Next refill in 5 days"
          />
        </div>

        {/* Health Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Health Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={healthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="bp" stroke="#8884d8" />
                    <Line type="monotone" dataKey="weight" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="glucose" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{appointment.doctorName}</p>
                        <p className="text-sm text-gray-500">{appointment.specialty}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{appointment.date}</p>
                        <p className="text-sm text-gray-500">{appointment.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">No upcoming appointments</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Book Appointment</h3>
              <p className="text-sm text-gray-500">Schedule a new appointment with your healthcare provider</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">View Health Records</h3>
              <p className="text-sm text-gray-500">Access your complete medical history and test results</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Start Telemedicine</h3>
              <p className="text-sm text-gray-500">Connect with a doctor virtually for consultation</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;