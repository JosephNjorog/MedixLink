import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.user);
  const loading = useSelector((state) => state.profile.loading);
  const error = useSelector((state) => state.profile.error);
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    dateOfBirth: user?.dateOfBirth || '',
    gender: user?.gender || '',
    emergencyContact: user?.emergencyContact || '',
    bloodType: user?.bloodType || '',
    allergies: user?.allergies?.join(', ') || '',
    medicalConditions: user?.medicalConditions?.join(', ') || '',
    insuranceProvider: user?.insuranceProvider || '',
    policyNumber: user?.policyNumber || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Transform allergies and medical conditions back to arrays
    const updatedData = {
      ...formData,
      allergies: formData.allergies.split(',').map(item => item.trim()).filter(Boolean),
      medicalConditions: formData.medicalConditions.split(',').map(item => item.trim()).filter(Boolean),
    };
    
    dispatch(updateProfile(updatedData));
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <h2 className="text-2xl font-bold">Edit Profile</h2>
          </CardHeader>
          
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date of Birth</label>
                  <Input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Gender</label>
                  <Select name="gender" value={formData.gender} onValueChange={(value) => handleChange({ target: { name: 'gender', value }})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Emergency Contact</label>
                <Input
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Blood Type</label>
                  <Select name="bloodType" value={formData.bloodType} onValueChange={(value) => handleChange({ target: { name: 'bloodType', value }})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blood type" />
                    </SelectTrigger>
                    <SelectContent>
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Allergies (comma-separated)</label>
                <Input
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Medical Conditions (comma-separated)</label>
                <Input
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Insurance Provider</label>
                  <Input
                    name="insuranceProvider"
                    value={formData.insuranceProvider}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Policy Number</label>
                  <Input
                    name="policyNumber"
                    value={formData.policyNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end space-x-4">
            <Button variant="outline" type="button" onClick={() => history.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default ProfileEdit;