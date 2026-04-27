import { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import { adminApi } from '../services/adminApi';

export default function DonationsPage() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div>Loading...</div>;

  const columns = [
    { key: 'name', label: 'Donor' },
    { key: 'email', label: 'Email' },
    { key: 'amount', label: 'Amount', render: (amount) => `Rs ${amount}` },
    { key: 'status', label: 'Status' },
    {
      key: 'createdAt',
      label: 'Date',
      render: (date) => new Date(date).toLocaleDateString()
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Donations</h1>
      <DataTable columns={columns} data={donations} />
    </div>
  );
}
