import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { CalendarDays, User } from 'lucide-react';

type Blog = {
  title: string;
  excerpt?: string;
  content: string;
  coverImage: string;
  author?: string;
  createdAt: string;
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blog/${slug}`);
        if (!response.ok) return;

        const result = await response.json();
        setBlog(result.data || null);
      } catch (error) {
        console.error('Error loading blog:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="py-20 text-center text-slate-600">Loading blog...</div>
      </Layout>
    );
  }

  if (!blog) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-3">Blog not found</h1>
          <Link to="/blog" className="text-orange-600 font-semibold">
            Back to Blog
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article>
        <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <Link to="/blog" className="text-sm font-semibold text-orange-600 hover:text-orange-700">
              Back to Blog
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4 mb-5">
              {blog.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-orange-600" />
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-orange-600" />
                {blog.author || 'NGO'}
              </span>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <img src={blog.coverImage} alt={blog.title} className="w-full rounded-xl mb-8 object-cover max-h-[520px]" />
            {blog.excerpt && <p className="text-xl text-slate-600 leading-relaxed mb-8">{blog.excerpt}</p>}
            <div className="whitespace-pre-line text-slate-700 leading-8 text-lg">
              {blog.content}
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
}
