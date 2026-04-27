import { RouteObject } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminSignup from './pages/AdminSignup';
import Dashboard from './pages/Dashboard';
import Blogs from './pages/Blogs';
import AddBlog from './pages/AddBlog';
import Donations from './pages/Donations';
import Volunteers from './pages/Volunteers';
import Gallery from './pages/Gallery';
import Analytics from './pages/Analytics';
import Activities from './pages/Activities';
import AdminLayout from './components/AdminLayout';

export const adminRoutes: RouteObject[] = [
  {
    path: '/admin-login',
    element: <AdminLogin />
  },
  {
    path: '/admin-signup',
    element: <AdminSignup />
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'activities',
        element: <Activities />
      },
      {
        path: 'blogs',
        element: <Blogs />
      },
      {
        path: 'blogs/add',
        element: <AddBlog />
      },
      {
        path: 'gallery',
        element: <Gallery />
      },
      {
        path: 'analytics',
        element: <Analytics />
      },
      {
        path: 'donations',
        element: <Donations />
      },
      {
        path: 'volunteers',
        element: <Volunteers />
      }
    ]
  }
];
