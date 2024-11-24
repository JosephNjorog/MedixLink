import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Download } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const TelemedicineHistory = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Fetch telemedicine session history
    const fetchSessionHistory = async () => {
      try {
        // API call to fetch session history would go here
        // For now, using mock data
        const mockSessions = [
          {
            id: 1,
            doctorName: 'Dr. Smith',
            date: '2024-03-20',
            time: '10:00 AM',
            duration: '30 minutes',
            reason: 'Follow-up Consultation',
            status: 'completed',
            notes: 'Patient showing improvement. Continue current medication.',
          },
          {
            id: 2,
            doctorName: 'Dr. Johnson',
            date: '2024-03-15',
            time: '2:30 PM',
            duration: '45 minutes',
            reason: 'Initial Consultation',
            status: 'completed',
            notes: 'New treatment plan prescribed.',
          },
          // Add more mock sessions as needed
        ];
        setSessions(mockSessions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching session history:', error);
        setLoading(false);
      }
    };

    fetchSessionHistory();
  }, []);

  const handleDownloadSummary = (sessionId) => {
    // Implement download logic here
    console.log('Downloading summary for session:', sessionId);
  };

  const filteredSessions = sessions.filter(session => {
    if (filter === 'all') return true;
    return session.status === filter;
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Telemedicine Session History</h2>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sessions</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="missed">Missed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Doctor</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSessions.map((session) => (
              <TableRow key={session.id}>
                <TableCell>{session.doctorName}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{session.date}</span>
                    <Clock className="h-4 w-4 ml-2" />
                    <span>{session.time}</span>
                  </div>
                </TableCell>
                <TableCell>{session.duration}</TableCell>
                <TableCell>{session.reason}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      session.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : session.status === 'cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadSummary(session.id)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Summary
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TelemedicineHistory;