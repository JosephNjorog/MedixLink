import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { FileText, Calendar, User, Activity, AlertTriangle } from 'lucide-react';
import { fetchHealthRecord, deleteHealthRecord } from '../../redux/actions/healthRecordActions';

const HealthRecordDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const healthRecord = useSelector((state) => state.healthRecords.currentRecord);

  useEffect(() => {
    const loadHealthRecord = async () => {
      try {
        setLoading(true);
        await dispatch(fetchHealthRecord(id));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadHealthRecord();
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this health record?')) {
      try {
        await dispatch(deleteHealthRecord(id));
        navigate('/health-records');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!healthRecord) {
    return (
      <Alert>
        <AlertTitle>Not Found</AlertTitle>
        <AlertDescription>The requested health record could not be found.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{healthRecord.title}</h2>
            <div className="space-x-2">
              <Button
                variant="outline"
                onClick={() => navigate(`/health-records/edit/${id}`)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span>Date: {new Date(healthRecord.date).toLocaleDateString()}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500" />
              <span>Doctor: {healthRecord.doctor}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-gray-500" />
              <span>Type: {healthRecord.recordType}</span>
            </div>

            <div className="mt-4">
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="h-5 w-5 text-gray-500" />
                <h3 className="text-lg font-semibold">Description</h3>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap pl-7">
                {healthRecord.description}
              </p>
            </div>

            {healthRecord.attachments && healthRecord.attachments.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Attachments</h3>
                <div className="grid grid-cols-2 gap-4">
                  {healthRecord.attachments.map((attachment, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg flex items-center justify-between"
                    >
                      <span>{attachment.name}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(attachment.url, '_blank')}
                      >
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthRecordDetails;