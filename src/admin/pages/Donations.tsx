import { FormEvent, useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import { adminApi } from '../services/adminApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

export default function DonationsPage() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [manualName, setManualName] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [manualAmount, setManualAmount] = useState('1000');
  const [manualStatus, setManualStatus] = useState('completed');
  const [manualPaymentMethod, setManualPaymentMethod] = useState('bank-transfer');
  const [isSubmittingManual, setIsSubmittingManual] = useState(false);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await adminApi.getAllDonations();
      setDonations(response.data.data);
    } catch (error) {
      console.error('Error fetching donations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleManualDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(manualAmount);
    if (!manualName || !manualEmail || !amount || amount <= 0) {
      toast.error('Please fill all manual donation fields correctly.');
      return;
    }

    setIsSubmittingManual(true);
    try {
      await adminApi.createManualDonation({
        name: manualName,
        email: manualEmail,
        amount,
        paymentMethod: manualPaymentMethod,
        status: manualStatus
      });
      toast.success('Manual donation added successfully.');
      setManualName('');
      setManualEmail('');
      setManualAmount('1000');
      setManualStatus('completed');
      setManualPaymentMethod('bank-transfer');
      fetchDonations();
    } catch (error) {
      console.error('Unable to add donation:', error);
      toast.error('Unable to add manual donation.');
    } finally {
      setIsSubmittingManual(false);
    }
  };

  const approveDonation = async (id: string) => {
    setSavingId(id);
    try {
      await adminApi.updateDonationStatus(id, { status: 'completed' });
      toast.success('Donation approved successfully.');
      fetchDonations();
    } catch (error) {
      console.error('Unable to approve donation:', error);
      toast.error('Unable to approve donation.');
    } finally {
      setSavingId(null);
    }
  };

  if (loading) return <div>Loading...</div>;

  const columns = [
    { key: 'name', label: 'Donor' },
    { key: 'email', label: 'Email' },
    { key: 'amount', label: 'Amount', render: (amount) => `Rs ${amount}` },
    {
      key: 'status',
      label: 'Status',
      render: (status) => (
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
          status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
        }`}>
          {status}
        </span>
      )
    },
    {
      key: 'createdAt',
      label: 'Date',
      render: (date) => new Date(date).toLocaleDateString()
    },
    {
      key: 'action',
      label: 'Action',
      render: (_value, row) =>
        row.status === 'pending' ? (
          <Button
            size="sm"
            onClick={() => approveDonation(row._id)}
            disabled={savingId === row._id}
          >
            {savingId === row._id ? 'Approving...' : 'Approve'}
          </Button>
        ) : (
          <span className="text-slate-600">No action</span>
        )
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Donations</h1>

      <Card className="border-slate-200 shadow-sm mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Add Manual Donation</h2>
          <form onSubmit={handleManualDonation} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="manual-name" className="text-sm font-medium text-slate-700">Donor Name</Label>
                <Input
                  id="manual-name"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="manual-email" className="text-sm font-medium text-slate-700">Email</Label>
                <Input
                  id="manual-email"
                  type="email"
                  value={manualEmail}
                  onChange={(e) => setManualEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="manual-amount" className="text-sm font-medium text-slate-700">Amount (Rs)</Label>
                <Input
                  id="manual-amount"
                  type="number"
                  min={1}
                  value={manualAmount}
                  onChange={(e) => setManualAmount(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="manual-payment-method" className="text-sm font-medium text-slate-700">Payment Method</Label>
                <select
                  id="manual-payment-method"
                  value={manualPaymentMethod}
                  onChange={(e) => setManualPaymentMethod(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                >
                  <option value="bank-transfer">Bank Transfer</option>
                  <option value="razorpay">Razorpay</option>
                  <option value="cash">Cash</option>
                </select>
              </div>
              <div>
                <Label htmlFor="manual-status" className="text-sm font-medium text-slate-700">Status</Label>
                <select
                  id="manual-status"
                  value={manualStatus}
                  onChange={(e) => setManualStatus(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                >
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>

            <Button type="submit" disabled={isSubmittingManual} className="bg-orange-600 hover:bg-orange-700 text-white">
              {isSubmittingManual ? 'Saving...' : 'Add Donation'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <DataTable columns={columns} data={donations} />
    </div>
  );
}
