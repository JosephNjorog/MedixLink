import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';

const ProfileView = () => {
  const user = useSelector((state) => state.profile.user);
  const loading = useSelector((state) => state.profile.loading);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xl uppercase">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{`${user?.firstName} ${user?.lastName}`}</h2>
              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p>{user?.dateOfBirth}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p>{user?.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p>{user?.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Emergency Contact</p>
                  <p>{user?.emergencyContact}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Medical Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Blood Type</p>
                  <p>{user?.bloodType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Allergies</p>
                  <p>{user?.allergies?.join(', ') || 'None'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Medical Conditions</p>
                  <p>{user?.medicalConditions?.join(', ') || 'None'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Insurance Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Insurance Provider</p>
                  <p>{user?.insuranceProvider}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Policy Number</p>
                  <p>{user?.policyNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileView;