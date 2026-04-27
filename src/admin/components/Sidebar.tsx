import { Link } from 'react-router-dom';
import { BarChart3, BookOpen, Image, Gift, Users, Home, LineChart } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { label: 'Dashboard', icon: Home, path: '/admin' },
    { label: 'Activities', icon: BarChart3, path: '/admin/activities' },
    { label: 'Blogs', icon: BookOpen, path: '/admin/blogs' },
    { label: 'Gallery', icon: Image, path: '/admin/gallery' },
    { label: 'Analytics', icon: LineChart, path: '/admin/analytics' },
    { label: 'Donations', icon: Gift, path: '/admin/donations' },
    { label: 'Volunteers', icon: Users, path: '/admin/volunteers' }
  ];

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">NGO Admin</h1>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 border-l-4 border-transparent hover:border-blue-600 transition"
            >
              <Icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
