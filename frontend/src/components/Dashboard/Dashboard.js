import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import StatsCard from './StatsCard';
import { Calendar, Users, Activity, Clock } from 'lucide-react';

const Dashboard = () => {
  // Sample data - In a real app, this would come from your backend
  const statsData = [
    {
      title: "Total Appointments",
      value: "28",
      change: "+12%",
      icon: <Calendar className="h-6 w-6 text-blue-500" />,
      description: "From last month"
    },
    {
      title: "Active Patients",
      value: "2,420",
      change: "+8.1%",
      icon: <Users className="h-6 w-6 text-green-500" />,
      description: "Active patients this month"
    },
    {
      title: "Health Score",
      value: "88%",
      change: "+2.5%",
      icon: <Activity className="h-6 w-6 text-purple-500" />,
      description: "Average health metrics"
    },
    {
      title: "Upcoming Sessions",
      value: "12",
      change: "+4",
      icon: <Clock className="h-6 w-6 text-yellow-500" />,
      description: "Scheduled for next week"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <select className="px-4 py-2 border rounded-md bg-white">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Sample activity items */}
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm font-medium">Appointment scheduled with Dr. Smith</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm font-medium">Lab results uploaded</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm font-medium">Medication reminder set</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Sample health metrics */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Blood Pressure</span>
                  <span className="text-sm text-gray-500">120/80</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Heart Rate</span>
                  <span className="text-sm text-gray-500">72 bpm</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Sleep Quality</span>
                  <span className="text-sm text-gray-500">7.5 hrs</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;