import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Loader2, Plus, Search, Filter, Download, Eye, Trash } from 'lucide-react';

const HealthRecordsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux state
  const { records, loading, error } = useSelector((state) => state.healthRecords);
  const userRole = useSelector((state) => state.auth.user?.role);

  // Local state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  // Fetch records on component mount
  useEffect(() => {
    dispatch(fetchHealthRecords());
  }, [dispatch]);

  // Filter and sort records
  const filteredAndSortedRecords = React.useMemo(() => {
    return records
      ?.filter((record) => {
        const matchesSearch = 
          record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.doctor?.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (filterType === 'all') return matchesSearch;
        return matchesSearch && record.type === filterType;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'date':
            return new Date(b.date) - new Date(a.date);
          case 'type':
            return a.type.localeCompare(b.type);
          case 'title':
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });
  }, [records, searchTerm, filterType, sortBy]);

  const handleAddRecord = () => {
    navigate('/health-records/add');
  };

  const handleViewRecord = (recordId) => {
    navigate(`/health-records/${recordId}`);
  };

  const handleDeleteClick = (record) => {
    setRecordToDelete(record);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteHealthRecord(recordToDelete.id));
      setShowDeleteDialog(false);
      setRecordToDelete(null);
    } catch (err) {
      console.error('Error deleting record:', err);
    }
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setRecordToDelete(null);
  };

  const handleExportRecords = () => {
    // Implementation for exporting records
    // This could be a CSV or PDF export
  };

  const getRecordTypeColor = (type) => {
    const colors = {
      'consultation': 'bg-blue-100 text-blue-800',
      'lab-result': 'bg-green-100 text-green-800',
      'prescription': 'bg-purple-100 text-purple-800',
      'vaccination': 'bg-yellow-100 text-yellow-800',
      'imaging': 'bg-pink-100 text-pink-800',
      'surgery': 'bg-red-100 text-red-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl font-bold">Health Records</CardTitle>
          <div className="flex space-x-2">
            {userRole === 'doctor' && (
              <Button onClick={handleAddRecord}>
                <Plus className="mr-2 h-4 w-4" />
                Add Record
              </Button>
            )}
            <Button variant="outline" onClick={handleExportRecords}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>

            <div className="flex gap-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="lab-result">Lab Result</SelectItem>
                  <SelectItem value="prescription">Prescription</SelectItem>
                  <SelectItem value="vaccination">Vaccination</SelectItem>
                  <SelectItem value="imaging">Imaging</SelectItem>
                  <SelectItem value="surgery">Surgery</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="type">Type</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : filteredAndSortedRecords?.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        {format(new Date(record.date), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell className="font-medium">{record.title}</TableCell>
                      <TableCell>
                        <Badge className={getRecordTypeColor(record.type)}>
                          {record.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{record.doctor?.name}</TableCell>
                      <TableCell>
                        <Badge variant={record.status === 'complete' ? 'success' : 'warning'}>
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewRecord(record.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {userRole === 'doctor' && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteClick(record)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No health records found</p>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Health Record</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this health record? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default HealthRecordsList;