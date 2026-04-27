import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, User } from 'lucide-react';
import { apiUrl } from '@/lib/api-url';

type Blog = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage: string;
  author?: string;
  createdAt: string;
};

export default function BlogIndexPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(apiUrl('/blog'));
        if (!response.ok) return;

        const result = await response.json();
        setBlogs(result.data || []);
      } catch (error) {
        console.error('Error loading blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <Layout>
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <span className="text-orange-600 font-semibold text-sm tracking-wide uppercase">Blog</span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-4">
            Stories & Updates
          </h1>
          <p className="text-slate-600 text-lg">
            Read updates from our team, community work, campaigns, and impact stories.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center text-slate-600">Loading blogs...</div>
          ) : blogs.length === 0 ? (
            <div className="text-center text-slate-600">No blog posts have been added yet.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {blogs.map((blog) => (
                <Card key={blog._id} className="border-orange-100 overflow-hidden hover:shadow-lg transition-shadow">
                  <Link to={`/blog/${blog.slug}`} className="block aspect-[4/3] bg-slate-100">
                    <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
                  </Link>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="w-3.5 h-3.5 text-orange-600" />
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-orange-600" />
                        {blog.author || 'NGO'}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-3">
                      <Link to={`/blog/${blog.slug}`} className="hover:text-orange-600 transition">
                        {blog.title}
                      </Link>
                    </h2>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {blog.excerpt || blog.content.slice(0, 150)}
                    </p>
                    <Link to={`/blog/${blog.slug}`} className="text-sm font-semibold text-orange-600 hover:text-orange-700">
                      Read more
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
