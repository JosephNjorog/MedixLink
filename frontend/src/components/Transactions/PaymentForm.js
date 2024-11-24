import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { AlertTriangle, CreditCard, Calendar, Lock } from 'lucide-react';
import { processPayment } from '../../redux/actions/transactionActions';

const PaymentForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedPackage = useSelector((state) => state.transactions.selectedPackage);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: ''
  });

  // Redirect if no package is selected
  if (!selectedPackage) {
    navigate('/packages');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') || value;
      setFormData(prev => ({
        ...prev,
        [name]: formatted
      }));
      return;
    }

    // Format expiry date
    if (name === 'expiryDate') {
      const formatted = value
        .replace(/\D/g, '')
        .replace(/^(\d{2})/, '$1/')
        .substr(0, 5);
      setFormData(prev => ({
        ...prev,
        [name]: formatted
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const paymentData = {
        ...formData,
        packageId: selectedPackage.id,
        amount: selectedPackage.price
      };

      await dispatch(processPayment(paymentData));
      navigate('/payment-success');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Payment Details</h2>
          <p className="text-gray-500">
            Subscribing to {selectedPackage.name} - ${selectedPackage.price}/month
          </p>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Payment Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="cardHolderName">Card Holder Name</Label>
              <Input
                id="cardHolderName"
                name="cardHolderName"
                value={formData.cardHolderName}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  required
                />
                <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <div className="relative">
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <div className="relative">
                  <Input
                    id="cvv"
                    name="cvv"
                    type="password"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    maxLength="3"
                    required
                  />
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/packages')}
                disabled={loading}
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={loading}
              >
                {loading ? 'Processing...' : `Pay $${selectedPackage.price}`}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentForm;