import { useAdminAuth } from '../hooks/useAdminAuth';
import { LogOut } from 'lucide-react';

export default function Topbar() {
  const { admin, logout } = useAdminAuth();

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="px-6 py-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">{admin?.email}</span>
          <button
            onClick={logout}
            className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
