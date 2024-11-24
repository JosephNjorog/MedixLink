import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedPackage: null,
  packages: [
    {
      id: 'basic',
      name: 'Basic Package',
      price: 0,
      features: [
        'User Registration and Profile Management',
        'View Appointments and Basic Health Records',
        'Medication Reminders',
        'Health Tips and Alerts'
      ],
      isPopular: false,
    },
    {
      id: 'standard',
      name: 'Standard Package',
      price: 29.99,
      features: [
        'All Basic Package Features',
        'Appointment Booking and Management',
        'Health Monitoring and Analytics',
        'Access to Detailed Medical Records',
        'Emergency Access to Health Records',
        'Insurance Integration (NHIF, SHA, SHIF)'
      ],
      isPopular: true,
    },
    {
      id: 'premium',
      name: 'Premium Package',
      price: 49.99,
      features: [
        'All Standard Package Features',
        'Telemedicine Consultations',
        'Detailed Health Analytics',
        'Integration with Wearable Devices',
        'Detailed Reports and Data Analytics',
        'Customer Support and Priority Assistance'
      ],
      isPopular: false,
    }
  ],
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setSelectedPackage: (state, action) => {
      state.selectedPackage = action.payload;
    },
  },
});

export const { setSelectedPackage } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;