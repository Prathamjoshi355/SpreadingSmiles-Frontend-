import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminApi } from '../services/adminApi';
import { blogDomains, type BlogDomain } from '@/lib/blog-domains';

type BlogData = {
  title: string;
  excerpt?: string;
  author?: string;
  content: string;
  domains?: BlogDomain[];
  date?: string;
};

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [author, setAuthor] = useState('NGO');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [domains, setDomains] = useState<BlogDomain[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;

    const loadBlog = async () => {
      try {
        const response = await adminApi.getBlogById(id);
        const blog: BlogData = response.data.data;
        setTitle(blog.title);
        setExcerpt(blog.excerpt || '');
        setAuthor(blog.author || 'NGO');
        setContent(blog.content);
        setDomains(blog.domains || []);
        setDate(blog.date ? new Date(blog.date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10));
      } catch (error) {
        console.error('Failed to load blog:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [id]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!id) {
      setError('Missing blog ID');
      return;
    }

    if (!title || !content || domains.length === 0) {
      setError('Please fill title, content, publish date, and select at least one domain');
      return;
    }

    const data = new FormData();
    data.append('title', title);
    data.append('excerpt', excerpt);
    data.append('author', author);
    data.append('date', date);
    data.append('content', content);
    data.append('domains', JSON.stringify(domains));
    if (image) data.append('image', image);

    setSubmitting(true);
    try {
      await adminApi.updateBlog(id, data);
      navigate('/admin/blogs');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Blog update failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading blog...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Blog</h1>

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
          <label className="block text-gray-700 font-semibold mb-2">Replace Cover Image</label>
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
                  <p className="text-xs text-slate-500">New image preview before upload.</p>
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
            {submitting ? 'Updating...' : 'Update Blog'}
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
