import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CreditCard, 
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle 
} from 'lucide-react';

const InsuranceDetails = () => {
  // Sample data - in a real app, this would come from your backend
  const [insuranceData] = useState({
    nhif: {
      policyNumber: "NHIF-2024-123456",
      status: "Active",
      coverageLimit: 500000,
      usedAmount: 150000,
      lastPayment: "2024-01-15",
      nextPayment: "2024-02-15",
      dependents: [
        { name: "Jane Doe", relationship: "Spouse", age: 32 },
        { name: "John Doe Jr", relationship: "Child", age: 8 }
      ],
      claims: [
        {
          id: "CLM-001",
          date: "2024-01-10",
          hospital: "Metropolitan Hospital",
          amount: 25000,
          status: "Approved",
          type: "Outpatient"
        },
        {
          id: "CLM-002",
          date: "2023-12-15",
          hospital: "City Medical Center",
          amount: 75000,
          status: "Processing",
          type: "Inpatient"
        }
      ]
    },
    sha: {
      policyNumber: "SHA-2024-789012",
      status: "Active",
      coverageLimit: 750000,
      usedAmount: 200000,
      lastPayment: "2024-01-15",
      nextPayment: "2024-02-15",
      claims: [
        {
          id: "CLM-003",
          date: "2024-01-05",
          hospital: "County General Hospital",
          amount: 45000,
          status: "Approved",
          type: "Surgery"
        }
      ]
    },
    shif: {
      policyNumber: "SHIF-2024-345678",
      status: "Active",
      coverageLimit: 1000000,
      usedAmount: 300000,
      lastPayment: "2024-01-15",
      nextPayment: "2024-02-15",
      claims: [
        {
          id: "CLM-004",
          date: "2024-01-20",
          hospital: "National Referral Hospital",
          amount: 150000,
          status: "Pending",
          type: "Specialized Treatment"
        }
      ]
    }
  });

  const getStatusBadge = (status) => {
    const statusStyles = {
      Active: "bg-green-100 text-green-800",
      Inactive: "bg-red-100 text-red-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Approved: "bg-green-100 text-green-800",
      Processing: "bg-blue-100 text-blue-800",
      Rejected: "bg-red-100 text-red-800"
    };
    
    return (
      <Badge className={statusStyles[status] || "bg-gray-100 text-gray-800"}>
        {status}
      </Badge>
    );
  };

  const getStatusIcon = (status) => {
    const icons = {
      Approved: <CheckCircle2 className="w-4 h-4 text-green-600" />,
      Pending: <Clock className="w-4 h-4 text-yellow-600" />,
      Processing: <Clock className="w-4 h-4 text-blue-600" />,
      Rejected: <XCircle className="w-4 h-4 text-red-600" />
    };
    return icons[status] || <AlertCircle className="w-4 h-4 text-gray-600" />;
  };

  const renderCoverageDetails = (insuranceType) => {
    const data = insuranceData[insuranceType];
    const coveragePercentage = (data.usedAmount / data.coverageLimit) * 100;

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Policy Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Policy Number</p>
                <p className="font-medium">{data.policyNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <div>{getStatusBadge(data.status)}</div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Payment</p>
                <p className="font-medium">{new Date(data.lastPayment).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Next Payment</p>
                <p className="font-medium">{new Date(data.nextPayment).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Coverage Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">Coverage Used</span>
                  <span className="font-medium">{coveragePercentage.toFixed(1)}%</span>
                </div>
                <Progress value={coveragePercentage} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Coverage Limit</p>
                  <p className="font-medium">KES {data.coverageLimit.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount Used</p>
                  <p className="font-medium">KES {data.usedAmount.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {data.dependents && (
          <Card>
            <CardHeader>
              <CardTitle>Dependents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.dependents.map((dependent, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{dependent.name}</p>
                      <p className="text-sm text-gray-500">{dependent.relationship}</p>
                    </div>
                    <Badge variant="outline">Age: {dependent.age}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Claims History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Hospital</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.claims.map((claim) => (
                  <TableRow key={claim.id}>
                    <TableCell>{new Date(claim.date).toLocaleDateString()}</TableCell>
                    <TableCell>{claim.hospital}</TableCell>
                    <TableCell>{claim.type}</TableCell>
                    <TableCell>KES {claim.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(claim.status)}
                        {claim.status}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Insurance Details</h2>
      
      <Tabs defaultValue="nhif">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="nhif">NHIF</TabsTrigger>
          <TabsTrigger value="sha">SHA</TabsTrigger>
          <TabsTrigger value="shif">SHIF</TabsTrigger>
        </TabsList>

        <TabsContent value="nhif">
          {renderCoverageDetails('nhif')}
        </TabsContent>
        
        <TabsContent value="sha">
          {renderCoverageDetails('sha')}
        </TabsContent>
        
        <TabsContent value="shif">
          {renderCoverageDetails('shif')}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InsuranceDetails;