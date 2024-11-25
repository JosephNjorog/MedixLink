import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import PackageSelection from '../components/Transactions/PackageSelection';
import PaymentForm from '../components/Transactions/PaymentForm';
import TransactionHistory from '../components/Transactions/TransactionHistory';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Loader } from '../components/common/Loader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TransactionPage = () => {
  const dispatch = useDispatch();
  const [selectedPackage, setSelectedPackage] = useState(null);
  
  const { 
    loading, 
    error, 
    transactions,
    currentSubscription 
  } = useSelector(state => state.transaction);

  useEffect(() => {
    // Fetch transaction history and current subscription
    dispatch({ type: 'FETCH_TRANSACTION_HISTORY' });
    dispatch({ type: 'FETCH_CURRENT_SUBSCRIPTION' });
  }, [dispatch]);

  const handlePackageSelect = (packageDetails) => {
    setSelectedPackage(packageDetails);
  };

  const handlePaymentSubmit = (paymentDetails) => {
    dispatch({
      type: 'PROCESS_PAYMENT',
      payload: {
        package: selectedPackage,
        payment: paymentDetails
      }
    });
  };

  const handlePaymentSuccess = () => {
    dispatch({ type: 'FETCH_CURRENT_SUBSCRIPTION' });
    setSelectedPackage(null);
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Subscription & Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="packages" className="space-y-4">
            <TabsList>
              <TabsTrigger value="packages">Subscription Packages</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
              <TabsTrigger value="history">Transaction History</TabsTrigger>
            </TabsList>

            <TabsContent value="packages">
              <div className="space-y-4">
                <div className="mb-4">
                  <h3 className="text-lg font-medium">Current Subscription</h3>
                  <p className="text-gray-600">
                    {currentSubscription ? `${currentSubscription.type} Package` : 'No active subscription'}
                  </p>
                </div>
                <PackageSelection
                  currentPackage={currentSubscription?.type}
                  onSelect={handlePackageSelect}
                />
              </div>
            </TabsContent>

            <TabsContent value="payment">
              {selectedPackage ? (
                <PaymentForm
                  packageDetails={selectedPackage}
                  onSubmit={handlePaymentSubmit}
                  onSuccess={handlePaymentSuccess}
                />
              ) : (
                <Alert>
                  <AlertDescription>
                    Please select a package first to proceed with payment
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="history">
              <TransactionHistory transactions={transactions} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionPage;