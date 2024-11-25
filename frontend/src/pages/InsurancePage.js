import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MainLayout } from '../components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import { 
  fetchInsuranceDetails, 
  fetchClaimsHistory,
  checkInsuranceBalance 
} from '../redux/actions/insuranceActions';
import InsuranceDetails from '../components/Insurance/InsuranceDetails';
import InsuranceForm from '../components/Insurance/InsuranceForm';
import InsuranceBalance from '../components/Insurance/InsuranceBalance';

const InsurancePage = () => {
  const dispatch = useDispatch();
  const { 
    insuranceDetails, 
    claimsHistory, 
    balances, 
    loading, 
    error 
  } = useSelector((state) => state.insurance);
  
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedClaim, setSelectedClaim] = useState(null);

  useEffect(() => {
    dispatch(fetchInsuranceDetails());
    dispatch(fetchClaimsHistory());
    dispatch(checkInsuranceBalance());
  }, [dispatch]);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Loader2 className="h-4 w-4 text-yellow-500 animate-spin" />;
      case 'rejected':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  if (error) {
    return (
      <MainLayout>
        <Alert variant="destructive" className="m-6">
          <AlertDescription>
            Error loading insurance information: {error}
          </AlertDescription>
        </Alert>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Insurance Management</h1>
          <Button onClick={() => setActiveTab('submit-claim')}>
            Submit New Claim
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {['NHIF', 'SHA', 'SHIF'].map((provider) => (
            <Card key={provider}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{provider}</CardTitle>
              </CardHeader>
              <CardContent>
                <InsuranceBalance 
                  provider={provider} 
                  balance={balances?.[provider.toLowerCase()]} 
                  loading={loading} 
                />
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="claims">Claims History</TabsTrigger>
            <TabsTrigger value="coverage">Coverage Details</TabsTrigger>
            <TabsTrigger value="submit-claim">Submit Claim</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardContent className="p-6">
                <InsuranceDetails 
                  details={insuranceDetails}
                  loading={loading}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="claims">
            <Card>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Claim ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">
                          <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                        </TableCell>
                      </TableRow>
                    ) : claimsHistory?.map((claim) => (
                      <TableRow key={claim.id}>
                        <TableCell>{claim.id}</TableCell>
                        <TableCell>{new Date(claim.date).toLocaleDateString()}</TableCell>
                        <TableCell>{claim.provider}</TableCell>
                        <TableCell>KES {claim.amount.toLocaleString()}</TableCell>
                        <TableCell className="flex items-center space-x-2">
                          {getStatusIcon(claim.status)}
                          <span>{claim.status}</span>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedClaim(claim)}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coverage">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Coverage Details</h3>
                  {insuranceDetails?.coverageDetails?.map((coverage, index) => (
                    <div key={index} className="border-b pb-4">
                      <h4 className="font-medium">{coverage.type}</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {coverage.description}
                      </p>
                      <div className="mt-2 flex justify-between text-sm">
                        <span>Limit: KES {coverage.limit?.toLocaleString()}</span>
                        <span>Used: KES {coverage.used?.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submit-claim">
            <Card>
              <CardContent className="p-6">
                <InsuranceForm onClose={() => setActiveTab('claims')} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default InsurancePage;