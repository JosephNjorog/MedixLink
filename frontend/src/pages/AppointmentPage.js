import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MainLayout } from '../components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppointmentList from '../components/Appointment/AppointmentList';
import AppointmentForm from '../components/Appointment/AppointmentForm';
import { Calendar, List, Plus } from 'lucide-react';

const AppointmentPage = () => {
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector((state) => state.appointments);
  const [view, setView] = useState('list'); // 'list' or 'calendar'

  useEffect(() => {
    // Fetch appointments when component mounts
    // dispatch(fetchAppointments());
  }, [dispatch]);

  const handleNewAppointment = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
    <MainLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Appointments</h1>
          <Button onClick={handleNewAppointment}>
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Manage Appointments</CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant={view === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setView('list')}
                >
                  <List className="h-4 w-4 mr-2" />
                  List
                </Button>
                <Button
                  variant={view === 'calendar' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setView('calendar')}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Calendar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming">
                <AppointmentList 
                  appointments={appointments?.filter(app => app.status === 'upcoming')}
                  view={view}
                  loading={loading}
                  error={error}
                />
              </TabsContent>

              <TabsContent value="past">
                <AppointmentList 
                  appointments={appointments?.filter(app => app.status === 'completed')}
                  view={view}
                  loading={loading}
                  error={error}
                />
              </TabsContent>

              <TabsContent value="cancelled">
                <AppointmentList 
                  appointments={appointments?.filter(app => app.status === 'cancelled')}
                  view={view}
                  loading={loading}
                  error={error}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {showForm && (
          <AppointmentForm
            onClose={handleFormClose}
            onSubmit={(data) => {
              // dispatch(createAppointment(data));
              handleFormClose();
            }}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default AppointmentPage;