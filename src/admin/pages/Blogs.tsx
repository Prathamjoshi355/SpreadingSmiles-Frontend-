import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../components/DataTable';
import { adminApi } from '../services/adminApi';
import { Plus } from 'lucide-react';
import { blogDomains, type BlogDomain } from '@/lib/blog-domains';

type Blog = {
  _id: string;
  title: string;
  slug: string;
  coverImage?: string;
  domains?: BlogDomain[];
  date?: string;
  createdAt: string;
};

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [draftDomains, setDraftDomains] = useState<Record<string, BlogDomain[]>>({});

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await adminApi.getAllBlogs();
      const loadedBlogs = response.data.data || [];
      setBlogs(loadedBlogs);
      setDraftDomains(
        Object.fromEntries(loadedBlogs.map((blog: Blog) => [blog._id, blog.domains || []]))
      );
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDomains = async (blog: Blog) => {
    const selectedDomains = draftDomains[blog._id] || [];

    if (selectedDomains.length === 0) {
      window.alert('Please select at least one domain.');
      return;
    }

    const data = new FormData();
    data.append('domains', JSON.stringify(selectedDomains));

    setSavingId(blog._id);
    try {
      await adminApi.updateBlog(blog._id, data);
      await fetchBlogs();
    } catch (error) {
      console.error('Error updating blog domains:', error);
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await adminApi.deleteBlog(id);
        fetchBlogs();
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  const columns = [
    { key: 'title', label: 'Title' },
    {
      key: 'coverImage',
      label: 'Image Preview',
      render: (coverImage: string) => (
        <img
          src={coverImage}
          alt="Blog cover"
          className="w-16 h-16 rounded object-cover border border-gray-300"
        />
      )
    },
    {
      key: 'date',
      label: 'Publish Date',
      render: (date: string) => (date ? new Date(date).toLocaleDateString() : '-')
    },
    {
      key: 'domains',
      label: 'Domains',
      render: (_domains: BlogDomain[] = [], blog: Blog) => (
        <div className="min-w-[190px] space-y-2">
          <select
            multiple
            size={4}
            value={draftDomains[blog._id] || []}
            onChange={(e) =>
              setDraftDomains((current) => ({
                ...current,
                [blog._id]: Array.from(e.target.selectedOptions, (option) => option.value as BlogDomain)
              }))
            }
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
          >
            {blogDomains.map((domain) => (
              <option key={domain.value} value={domain.value}>
                {domain.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            disabled={savingId === blog._id}
            onClick={() => handleSaveDomains(blog)}
            className="text-sm bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-1 disabled:opacity-50"
          >
            {savingId === blog._id ? 'Saving...' : 'Save Domains'}
          </button>
        </div>
      )
    },
    {
      key: 'createdAt',
      label: 'Created',
      render: (date) => new Date(date).toLocaleDateString()
    },
    {
      key: 'edit',
      label: 'Edit',
      render: (_value: unknown, blog: Blog) => (
        <Link
          to={`/admin/blogs/edit/${blog._id}`}
          className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
        >
          Edit
        </Link>
      )
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Blogs</h1>
        <Link
          to="/admin/blogs/add"
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" />
          <span>Add Blog</span>
        </Link>
      </div>

      <DataTable columns={columns} data={blogs} onDelete={handleDelete} />
    </div>
  );
}
