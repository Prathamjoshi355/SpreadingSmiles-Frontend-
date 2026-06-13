import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../services/adminApi';
import { blogDomains, type BlogDomain } from '@/lib/blog-domains';

export default function AddBlogPage() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [author, setAuthor] = useState('NGO');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [content, setContent] = useState('');
  const [domains, setDomains] = useState<BlogDomain[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title || !content || !image || domains.length === 0) {
      setError('Please fill title, content, cover image, and select at least one domain');
      return;
    }

    const data = new FormData();
    data.append('title', title);
    data.append('excerpt', excerpt);
    data.append('author', author);
    data.append('date', date);
    data.append('content', content);
    data.append('domains', JSON.stringify(domains));
    data.append('image', image);

    setSubmitting(true);
    try {
      await adminApi.createBlog(data);
      navigate('/admin/blogs');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Blog create failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Blog</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 max-w-4xl">
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              placeholder="Blog title"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Author</label>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              placeholder="Author name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Publish Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Excerpt</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            placeholder="Short summary"
            maxLength={500}
            rows={3}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Domains</label>
          <select
            multiple
            size={5}
            value={domains}
            onChange={(e) =>
              setDomains(Array.from(e.target.selectedOptions, (option) => option.value as BlogDomain))
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
          >
            {blogDomains.map((domain) => (
              <option key={domain.value} value={domain.value}>
                {domain.label}
              </option>
            ))}
          </select>
          <p className="mt-2 text-sm text-gray-500">Select one or more domains for this blog.</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            placeholder="Write the blog content"
            rows={12}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Cover Image</label>
          <div className="grid md:grid-cols-[auto_1fr] gap-4 items-start">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setImage(file);
                if (file) {
                  setPreviewUrl(URL.createObjectURL(file));
                } else {
                  setPreviewUrl(null);
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />

            {previewUrl && (
              <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-slate-50">
                <img
                  src={previewUrl}
                  alt="Upload preview"
                  className="w-24 h-24 rounded-lg object-cover border border-gray-300"
                />
                <div>
                  <div className="text-sm font-semibold text-slate-900">Image preview</div>
                  <p className="text-xs text-slate-500">This image will appear next to the title.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {error && <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {submitting ? 'Publishing...' : 'Publish Blog'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/blogs')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
