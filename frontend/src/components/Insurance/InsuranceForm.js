import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

const InsuranceForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.insurance);
  const [formData, setFormData] = useState({
    policyNumber: '',
    claimAmount: '',
    claimType: '',
    description: '',
    documents: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      documents: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create FormData object for file upload
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      submitData.append(key, formData[key]);
    });
    
    // Dispatch action to submit claim
    // dispatch(submitInsuranceClaim(submitData));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">Submit Insurance Claim</h2>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Policy Number</label>
            <input
              type="text"
              name="policyNumber"
              value={formData.policyNumber}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Claim Amount</label>
            <input
              type="number"
              name="claimAmount"
              value={formData.claimAmount}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Claim Type</label>
            <select
              name="claimType"
              value={formData.claimType}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select Claim Type</option>
              <option value="medical">Medical Expense</option>
              <option value="prescription">Prescription</option>
              <option value="dental">Dental</option>
              <option value="vision">Vision</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
              rows="4"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Supporting Documents</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-md"
              accept=".pdf,.jpg,.jpeg,.png"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Claim'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
