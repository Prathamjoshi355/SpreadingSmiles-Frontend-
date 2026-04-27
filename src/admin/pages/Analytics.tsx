import { useEffect, useState } from 'react';
import { BarChart3, BookOpen, Gift, Image, Users, Activity } from 'lucide-react';
import StatCard from '../components/StatCard';
import { adminApi } from '../services/adminApi';

export default function AnalyticsPage() {
  const [stats, setStats] = useState({
    blogs: 0,
    activities: 0,
    galleryImages: 0,
    volunteers: 0,
    newVolunteers: 0,
    donations: 0,
    totalAmount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await adminApi.getAnalytics();
        setStats(response.data.stats);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard title="Blogs" value={stats.blogs} icon={<BookOpen className="w-6 h-6" />} color="blue" />
        <StatCard title="Activities" value={stats.activities} icon={<Activity className="w-6 h-6" />} color="green" />
        <StatCard title="Gallery Images" value={stats.galleryImages} icon={<Image className="w-6 h-6" />} color="purple" />
        <StatCard title="Volunteers" value={stats.volunteers} icon={<Users className="w-6 h-6" />} color="orange" />
        <StatCard title="New Volunteers" value={stats.newVolunteers} icon={<BarChart3 className="w-6 h-6" />} color="blue" />
        <StatCard title="Donation Amount" value={`Rs ${stats.totalAmount.toLocaleString()}`} icon={<Gift className="w-6 h-6" />} color="green" />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Summary</h2>
        <p className="text-gray-600">
          {stats.donations} completed donation records and {stats.newVolunteers} new volunteer requests are currently tracked.
        </p>
      </div>
    </div>
  );
}
