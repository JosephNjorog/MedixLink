import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const InsuranceBalance = () => {
  const dispatch = useDispatch();
  const { loading, error, balances } = useSelector((state) => state.insurance);

  useEffect(() => {
    // Fetch insurance balances
    // dispatch(fetchInsuranceBalances());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* NHIF Balance */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">NHIF Balance</h3>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            KES {balances?.nhif?.toLocaleString() || '0'}
          </div>
          <p className="text-sm text-gray-500">
            Last Updated: {balances?.nhifLastUpdate || 'N/A'}
          </p>
        </CardContent>
      </Card>

      {/* SHA Balance */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">SHA Balance</h3>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            KES {balances?.sha?.toLocaleString() || '0'}
          </div>
          <p className="text-sm text-gray-500">
            Last Updated: {balances?.shaLastUpdate || 'N/A'}
          </p>
        </CardContent>
      </Card>

      {/* SHIF Balance */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">SHIF Balance</h3>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            KES {balances?.shif?.toLocaleString() || '0'}
          </div>
          <p className="text-sm text-gray-500">
            Last Updated: {balances?.shifLastUpdate || 'N/A'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsuranceBalance;