import { useEffect, useState } from 'react';
import { adminApi } from '../services/adminApi';

const categories = ['event', 'team', 'activity', 'impact', 'other'];

type Activity = {
  _id: string;
  title: string;
};

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('event');
  const [date, setDate] = useState('');
  const [activityId, setActivityId] = useState('');
  const [imagesFiles, setImagesFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchImages = async () => {
    try {
      const response = await adminApi.getAllImages();
      setImages(response.data.data || []);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await adminApi.getAllActivities();
      setActivities(response.data.data || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([fetchImages(), fetchActivities()]);
      setLoading(false);
    };

    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!imagesFiles || imagesFiles.length === 0) {
      setError('Please choose one or more images');
      return;
    }

    const data = new FormData();
    Array.from(imagesFiles).forEach((file) => data.append('images', file));
    data.append('title', title);
    data.append('description', description);
    data.append('category', category);
    if (date) {
      data.append('date', date);
    }
    if (activityId) {
      data.append('activityId', activityId);
    }

    setSubmitting(true);
    try {
      await adminApi.uploadImage(data);
      setTitle('');
      setDescription('');
      setCategory('event');
      setDate('');
      setActivityId('');
      setImagesFiles(null);
      await fetchImages();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Upload failed');
    } finally {
      setSubmitting(false);
    }
  };

  const [editingImage, setEditingImage] = useState<any>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCategory, setEditCategory] = useState('event');
  const [editDate, setEditDate] = useState('');
  const [editActivityId, setEditActivityId] = useState('');
  const [editImageFile, setEditImageFile] = useState<File | null>(null);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this image?')) return;

    try {
      await adminApi.deleteImage(id);
      await fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const openEdit = (image: any) => {
    setEditingImage(image);
    setEditTitle(image.title || '');
    setEditDescription(image.description || '');
    setEditCategory(image.category || 'event');
    setEditDate(image.date ? image.date.slice(0, 10) : '');
    setEditActivityId(image.activity || '');
    setEditImageFile(null);
  };

  const closeEdit = () => {
    setEditingImage(null);
    setEditImageFile(null);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingImage) return;

    const data = new FormData();
    data.append('title', editTitle);
    data.append('description', editDescription);
    data.append('category', editCategory);
    data.append('date', editDate);
    data.append('activityId', editActivityId);
    if (editImageFile) {
      data.append('image', editImageFile);
    }

    try {
      await adminApi.updateImage(editingImage._id, data);
      closeEdit();
      await fetchImages();
    } catch (error: any) {
      console.error('Error updating image:', error.response?.data?.message || error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Gallery</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            placeholder="Title"
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
        />

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
          />
          <select
            value={activityId}
            onChange={(e) => setActivityId(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
          >
            <option value="">Link to activity (optional)</option>
            {activities.map((activity) => (
              <option key={activity._id} value={activity._id}>
                {activity.title}
              </option>
            ))}
          </select>
          <div className="text-sm text-slate-600 px-4 py-2 border border-gray-200 rounded-lg bg-slate-50">
            Optional date and activity link help keep images sorted and connected.
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImagesFiles(e.target.files)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {submitting ? 'Uploading...' : 'Upload Images'}
          </button>
        </div>

        {error && <div className="mt-4 text-red-600">{error}</div>}
      </form>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {images.map((item: any) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={item.imageUrl} alt={item.title || 'Gallery'} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.title || 'Untitled'}</h3>
                    <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => openEdit(item)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-700 text-sm font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {item.description && <p className="text-sm text-gray-600 mt-2">{item.description}</p>}
                {item.date && <p className="text-xs text-slate-500 mt-2">Date: {new Date(item.date).toLocaleDateString()}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {editingImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Edit Gallery Image</h2>
                <p className="text-sm text-slate-500">Update title, category, date, activity link or replace image.</p>
              </div>
              <button onClick={closeEdit} className="text-slate-500 hover:text-slate-900">
                Close
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  placeholder="Title"
                />
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
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
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                placeholder="Description"
                rows={3}
              />

              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="date"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
                <select
                  value={editActivityId}
                  onChange={(e) => setEditActivityId(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                >
                  <option value="">Link to activity (optional)</option>
                  {activities.map((activity) => (
                    <option key={activity._id} value={activity._id}>
                      {activity.title}
                    </option>
                  ))}
                </select>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditImageFile(e.target.files?.[0] || null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button type="button" onClick={closeEdit} className="px-4 py-2 rounded-lg border border-gray-300 text-slate-700 hover:bg-slate-50">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
