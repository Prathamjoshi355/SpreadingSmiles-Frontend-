import { useEffect, useState } from 'react';
import { adminApi } from '../services/adminApi';

const categories = ['event', 'team', 'activity', 'impact', 'other'];

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('event');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchImages = async () => {
    try {
      const response = await adminApi.getAllImages();
      setImages(response.data.data || []);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!image) {
      setError('Please choose an image');
      return;
    }

    const data = new FormData();
    data.append('image', image);
    data.append('title', title);
    data.append('description', description);
    data.append('category', category);

    setSubmitting(true);
    try {
      await adminApi.uploadImage(data);
      setTitle('');
      setDescription('');
      setCategory('event');
      setImage(null);
      await fetchImages();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Upload failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this image?')) return;

    try {
      await adminApi.deleteImage(id);
      await fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
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

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {submitting ? 'Uploading...' : 'Upload Image'}
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
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 hover:text-red-700 text-sm font-semibold"
                  >
                    Delete
                  </button>
                </div>
                {item.description && <p className="text-sm text-gray-600 mt-2">{item.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
