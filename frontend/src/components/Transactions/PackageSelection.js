import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { selectPackage } from '../../redux/actions/transactionActions';

const PackageSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const packages = [
    {
      id: 'basic',
      name: 'Basic Package',
      price: 0,
      billing: 'Free',
      features: [
        'User Registration and Profile Management',
        'View Appointments and Basic Health Records',
        'Medication Reminders',
        'Health Tips and Alerts'
      ]
    },
    {
      id: 'standard',
      name: 'Standard Package',
      price: 29.99,
      billing: 'monthly',
      features: [
        'All Basic Package Features',
        'Appointment Booking and Management',
        'Health Monitoring and Analytics',
        'Access to Detailed Medical Records',
        'Emergency Access to Health Records',
        'Insurance Integration (NHIF, SHA, SHIF)'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Package',
      price: 49.99,
      billing: 'monthly',
      features: [
        'All Standard Package Features',
        'Telemedicine Consultations',
        'Detailed Health Analytics',
        'Integration with Wearable Devices',
        'Detailed Reports and Data Analytics',
        'Priority Customer Support'
      ]
    }
  ];

  const handlePackageSelect = (packageId) => {
    dispatch(selectPackage(packageId));
    if (packageId !== 'basic') {
      navigate('/payment');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8">Choose Your Package</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card 
            key={pkg.id}
            className={`relative ${
              pkg.id === 'premium' ? 'border-primary' : ''
            }`}
          >
            {pkg.id === 'premium' && (
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl text-sm">
                Popular
              </div>
            )}
            <CardHeader>
              <h3 className="text-2xl font-bold">{pkg.name}</h3>
              <div className="mt-2">
                <span className="text-3xl font-bold">
                  ${pkg.price}
                </span>
                {pkg.billing !== 'Free' && (
                  <span className="text-gray-500 ml-2">/{pkg.billing}</span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                variant={pkg.id === 'premium' ? 'default' : 'outline'}
                onClick={() => handlePackageSelect(pkg.id)}
              >
                {pkg.price === 0 ? 'Get Started' : 'Select Package'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PackageSelection;