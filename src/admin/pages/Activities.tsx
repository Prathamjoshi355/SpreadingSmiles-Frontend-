import { useEffect, useState } from 'react';
import { adminApi } from '../services/adminApi';
import DataTable from '../components/DataTable';

const categories = ['education', 'health', 'environment', 'community', 'disaster-relief', 'other'];

export default function ActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('community');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [volunteers, setVolunteers] = useState('');
  const [images, setImages] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchActivities = async () => {
    try {
      const response = await adminApi.getAllActivities();
      setActivities(response.data.data || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title || !description || !date) {
      setError('Please fill title, description, and date');
      return;
    }

    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('category', category);
    data.append('date', date);
    data.append('location', location);
    data.append('volunteers', volunteers || '0');

    Array.from(images || []).forEach((image) => {
      data.append('images', image);
    });

    setSubmitting(true);
    try {
      await adminApi.createActivity(data);
      setTitle('');
      setDescription('');
      setCategory('community');
      setDate('');
      setLocation('');
      setVolunteers('');
      setImages(null);
      await fetchActivities();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Activity create failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this activity?')) return;

    try {
      await adminApi.deleteActivity(id);
      await fetchActivities();
    } catch (error) {
      console.error('Error deleting activity:', error);
    }
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    {
      key: 'date',
      label: 'Date',
      render: (value) => new Date(value).toLocaleDateString()
    },
    { key: 'location', label: 'Location' },
    { key: 'volunteers', label: 'Volunteers' }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Activities</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            placeholder="Activity title"
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 mb-4"
          placeholder="Description"
          rows={3}
          required
        />

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            required
          />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            placeholder="Location"
          />
          <input
            type="number"
            min={0}
            value={volunteers}
            onChange={(e) => setVolunteers(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            placeholder="Volunteers"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImages(e.target.files)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {submitting ? 'Saving...' : 'Create Activity'}
          </button>
        </div>

        {error && <div className="mt-4 text-red-600">{error}</div>}
      </form>

      {loading ? <div>Loading...</div> : <DataTable columns={columns} data={activities} onDelete={handleDelete} />}
    </div>
  );
}
