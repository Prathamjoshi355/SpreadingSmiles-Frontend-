import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminApi } from '../services/adminApi';
import { blogDomains, type BlogDomain } from '@/lib/blog-domains';

type Blog = {
  title: string;
  excerpt?: string;
  author?: string;
  date?: string;
  content: string;
  domains?: BlogDomain[];
  coverImage: string;
  slug: string;
};

export default function EditBlogPage() {
  const { slug } = useParams();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [author, setAuthor] = useState('NGO');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [domains, setDomains] = useState<BlogDomain[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) return;

    const loadBlog = async () => {
      try {
        const response = await adminApi.getBlogBySlug(slug);
        const blog: Blog = response.data.data;

        setTitle(blog.title);
        setExcerpt(blog.excerpt || '');
        setAuthor(blog.author || 'NGO');
        setDate(blog.date ? blog.date.slice(0, 10) : '');
        setContent(blog.content);
        setDomains(blog.domains || []);
      } catch (error: any) {
        setError(error.response?.data?.message || 'Could not load blog');
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title || !content || domains.length === 0) {
      setError('Please fill title, content, and select at least one domain');
      return;
    }

    const data = new FormData();
    data.append('title', title);
    data.append('excerpt', excerpt);
    data.append('author', author);
    if (date) data.append('date', date);
    data.append('content', content);
    data.append('domains', JSON.stringify(domains));
    if (image) data.append('image', image);

    setSubmitting(true);
    try {
      const response = await adminApi.getBlogBySlug(slug || '');
      const blog = response.data.data;
      await adminApi.updateBlog(blog._id, data);
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
        <div className="grid md:grid-cols-2 gap-4 mb-4">
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
          <label className="block text-gray-700 font-semibold mb-2">Published Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
          />
          <p className="mt-2 text-sm text-gray-500">Update the publish date for sorting.</p>
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
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <p className="mt-2 text-sm text-gray-500">Leave blank to keep the existing image.</p>
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
