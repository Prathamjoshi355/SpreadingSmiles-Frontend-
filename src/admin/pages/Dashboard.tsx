import { useEffect, useState } from 'react';
import { BarChart3, BookOpen, Gift, Users } from 'lucide-react';
import StatCard from '../components/StatCard';
import { adminApi } from '../services/adminApi';

export default function Dashboard() {
  const [stats, setStats] = useState({
    blogs: 0,
    activities: 0,
    donations: 0,
    volunteers: 0,
    totalAmount: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [blogs, activities, donations, volunteers] = await Promise.all([
          adminApi.getAllBlogs(),
          adminApi.getAllActivities(),
          adminApi.getDonationStats(),
          adminApi.getVolunteerStats()
        ]);

        setStats({
          blogs: blogs.data.count || 0,
          activities: activities.data.count || 0,
          donations: donations.data.stats?.totalDonations || 0,
          volunteers: volunteers.data.stats?.totalVolunteers || 0,
          totalAmount: donations.data.stats?.totalAmount || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Blogs"
          value={stats.blogs}
          icon={<BookOpen className="w-6 h-6" />}
          color="blue"
        />
        <StatCard
          title="Total Activities"
          value={stats.activities}
          icon={<BarChart3 className="w-6 h-6" />}
          color="green"
        />
        <StatCard
          title="Total Donations"
          value={`$${stats.totalAmount.toFixed(2)}`}
          icon={<Gift className="w-6 h-6" />}
          color="orange"
        />
        <StatCard
          title="Total Volunteers"
          value={stats.volunteers}
          icon={<Users className="w-6 h-6" />}
          color="purple"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Stats</h2>
        <p className="text-gray-600">All systems operational</p>
      </div>
    </div>
  );
}
