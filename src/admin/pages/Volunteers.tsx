import { useEffect, useState } from 'react';
import DataTable from '../components/DataTable';
import { adminApi } from '../services/adminApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

type Volunteer = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'active' | 'inactive';
  photoUrl?: string;
  createdAt: string;
};

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [photoFiles, setPhotoFiles] = useState<Record<string, File | null>>({});

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

  const handleApprove = async (volunteer: Volunteer) => {
    const photo = photoFiles[volunteer._id];

    if (!photo && !volunteer.photoUrl) {
      toast.error('Please upload a volunteer photo before approving.');
      return;
    }

    const formData = new FormData();
    formData.append('status', 'active');
    if (photo) {
      formData.append('photo', photo);
    }

    setSavingId(volunteer._id);
    try {
      await adminApi.updateVolunteer(volunteer._id, formData);
      toast.success('Volunteer approved for website slider.');
      setPhotoFiles((current) => ({ ...current, [volunteer._id]: null }));
      fetchVolunteers();
    } catch (error) {
      console.error('Error approving volunteer:', error);
      toast.error('Unable to approve volunteer.');
    } finally {
      setSavingId(null);
    }
  };

  const handleDeactivate = async (id: string) => {
    setSavingId(id);
    try {
      await adminApi.updateVolunteer(id, { status: 'inactive' });
      toast.success('Volunteer hidden from website slider.');
      fetchVolunteers();
    } catch (error) {
      console.error('Error hiding volunteer:', error);
      toast.error('Unable to hide volunteer.');
    } finally {
      setSavingId(null);
    }
  };

  if (loading) return <div>Loading...</div>;

  const columns = [
    {
      key: 'photoUrl',
      label: 'Photo',
      render: (photoUrl, row: Volunteer) =>
        photoUrl ? (
          <img
            src={photoUrl}
            alt={row.name}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <span className="text-slate-500">No photo</span>
        )
    },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    {
      key: 'status',
      label: 'Status',
      render: (status) => (
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
          status === 'active' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
        }`}>
          {status}
        </span>
      )
    },
    {
      key: 'upload',
      label: 'Upload Photo',
      render: (_value, row: Volunteer) => (
        <Input
          type="file"
          accept="image/*"
          className="w-48"
          onChange={(event) =>
            setPhotoFiles((current) => ({
              ...current,
              [row._id]: event.target.files?.[0] || null
            }))
          }
        />
      )
    },
    {
      key: 'createdAt',
      label: 'Date',
      render: (date) => new Date(date).toLocaleDateString()
    },
    {
      key: 'action',
      label: 'Website',
      render: (_value, row: Volunteer) =>
        row.status === 'active' ? (
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleDeactivate(row._id)}
            disabled={savingId === row._id}
          >
            {savingId === row._id ? 'Saving...' : 'Hide'}
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={() => handleApprove(row)}
            disabled={savingId === row._id}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            {savingId === row._id ? 'Approving...' : 'Approve'}
          </Button>
        )
    }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Volunteers</h1>
      <DataTable columns={columns} data={volunteers} onDelete={handleDelete} />
    </div>
  );
}
