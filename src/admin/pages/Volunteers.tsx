import { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import { adminApi } from '../services/adminApi';

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const response = await adminApi.getAllVolunteers();
      setVolunteers(response.data.data);
    } catch (error) {
      console.error('Error fetching volunteers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this volunteer?')) {
      try {
        await adminApi.deleteVolunteer(id);
        fetchVolunteers();
      } catch (error) {
        console.error('Error deleting volunteer:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'status', label: 'Status' },
    {
      key: 'createdAt',
      label: 'Date',
      render: (date) => new Date(date).toLocaleDateString()
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Volunteers</h1>
      <DataTable columns={columns} data={volunteers} onDelete={handleDelete} />
    </div>
  );
}
