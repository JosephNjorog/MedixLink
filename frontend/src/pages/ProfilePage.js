import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MainLayout } from '../components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Shield, CreditCard, Bell } from 'lucide-react';
import { fetchUserProfile } from '../redux/actions/profileActions';
import ProfileView from '../components/Profile/ProfileView';
import ProfileEdit from '../components/Profile/ProfileEdit';
import ChangePassword from '../components/Profile/ChangePassword';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  if (error) {
    return (
      <MainLayout>
        <Alert variant="destructive" className="m-6">
          <AlertDescription>
            Error loading profile: {error}
          </AlertDescription>
        </Alert>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Profile</h1>
          {activeTab === 'profile' && !isEditing && (
            <Button onClick={handleEditToggle}>
              Edit Profile
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Profile Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-3xl">
                          {profile?.name?.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium">{profile?.name}</h3>
                      <p className="text-sm text-gray-500">{profile?.email}</p>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-sm">
                        <strong>Subscription:</strong> {profile?.subscription?.plan}
                      </p>
                      <p className="text-sm">
                        <strong>Member since:</strong>{' '}
                        {new Date(profile?.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="profile">Profile Details</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="subscription">Subscription</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile">
                    {isEditing ? (
                      <ProfileEdit 
                        profile={profile}
                        onCancel={handleEditToggle}
                        onSave={() => {
                          handleEditToggle();
                          dispatch(fetchUserProfile());
                        }}
                      />
                    ) : (
                      <ProfileView profile={profile} />
                    )}
                  </TabsContent>

                  <TabsContent value="security">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="font-medium">Password</h3>
                          <p className="text-sm text-gray-500">
                            Change your password regularly to keep your account secure
                          </p>
                        </div>
                        <Shield className="h-5 w-5 text-gray-500" />
                      </div>
                      <ChangePassword />
                    </div>
                  </TabsContent>

                  <TabsContent value="subscription">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="font-medium">Current Plan</h3>
                          <p className="text-sm text-gray-500">
                            {profile?.subscription?.plan} Package
                          </p>
                        </div>
                        <CreditCard className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="border-t pt-6">
                        <h4 className="font-medium mb-2">Features</h4>
                        <ul className="space-y-2">
                          {profile?.subscription?.features?.map((feature, index) => (
                            <li key={index} className="text-sm flex items-center">
                              <span className="mr-2">✓</span> {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="notifications">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="font-medium">Notification Settings</h3>
                          <p className="text-sm text-gray-500">
                            Manage how you receive notifications
                          </p>
                        </div>
                        <Bell className="h-5 w-5 text-gray-500" />
                      </div>
                      {/* Add notification preferences component here */}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;