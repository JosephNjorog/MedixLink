import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MainLayout } from '../components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import HealthRecordsList from '../components/HealthRecords/HealthRecordsList';
import HealthRecordDetails from '../components/HealthRecords/HealthRecordDetails';
import AddHealthRecord from '../components/HealthRecords/AddHealthRecord';
import { Search, Filter, Download, Plus, Loader2 } from 'lucide-react';
import { fetchHealthRecords, downloadHealthRecords } from '../redux/actions/healthRecordActions';

const HealthRecordsPage = () => {
  const dispatch = useDispatch();
  const { healthRecords, loading, error } = useSelector((state) => state.healthRecords);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  useEffect(() => {
    dispatch(fetchHealthRecords());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRecordSelect = (record) => {
    setSelectedRecord(record);
  };

  const handleAddRecord = () => {
    setShowAddForm(true);
  };

  const handleDownload = async () => {
    try {
      await dispatch(downloadHealthRecords(filteredRecords));
    } catch (error) {
      console.error('Error downloading records:', error);
    }
  };

  const handleCloseDialog = () => {
    setSelectedRecord(null);
    setShowAddForm(false);
  };

  const filteredRecords = healthRecords?.filter(record => {
    const matchesSearch = 
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' || record.type === activeFilter;
    
    const recordDate = new Date(record.date);
    const matchesDate = 
      (!dateRange.start || recordDate >= new Date(dateRange.start)) &&
      (!dateRange.end || recordDate <= new Date(dateRange.end));
    
    return matchesSearch && matchesFilter && matchesDate;
  });

  if (error) {
    return (
      <MainLayout>
        <Alert variant="destructive" className="m-6">
          <AlertDescription>
            Error loading health records: {error}
          </AlertDescription>
        </Alert>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Health Records</h1>
          <div className="flex space-x-2">
            <Button 
              variant="outline"
              onClick={handleDownload}
              disabled={loading || !filteredRecords?.length}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Download className="h-4 w-4 mr-2" />
              )}
              Export Records
            </Button>
            <Button onClick={handleAddRecord}>
              <Plus className="h-4 w-4 mr-2" />
              Add Record
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Records List</CardTitle>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search records..."
                      value={searchTerm}
                      onChange={handleSearch}
                      className="pl-8"
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs 
                  defaultValue="all" 
                  className="w-full"
                  onValueChange={setActiveFilter}
                >
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="lab">Lab Results</TabsTrigger>
                    <TabsTrigger value="prescription">Prescriptions</TabsTrigger>
                    <TabsTrigger value="imaging">Imaging</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all">
                    <HealthRecordsList
                      records={filteredRecords}
                      onSelect={handleRecordSelect}
                      loading={loading}
                    />
                  </TabsContent>

                  {['lab', 'prescription', 'imaging'].map((type) => (
                    <TabsContent key={type} value={type}>
                      <HealthRecordsList
                        records={filteredRecords?.filter(record => record.type === type)}
                        onSelect={handleRecordSelect}
                        loading={loading}
                      />
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            {selectedRecord ? (
              <HealthRecordDetails
                record={selectedRecord}
                onClose={() => setSelectedRecord(null)}
              />
            ) : (
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-gray-500">
                    Select a health record to view details
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <Dialog open={showAddForm} onOpenChange={handleCloseDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Health Record</DialogTitle>
              <DialogDescription>
                Fill in the details below to add a new health record.
              </DialogDescription>
            </DialogHeader>
            <AddHealthRecord onClose={handleCloseDialog} />
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default HealthRecordsPage;