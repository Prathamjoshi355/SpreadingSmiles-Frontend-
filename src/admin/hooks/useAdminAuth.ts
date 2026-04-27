import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../services/adminApi';

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setIsLoading(false);
        navigate('/admin-login');
        return;
      }

      try {
        const response = await adminApi.getMe();
        setAdmin(response.data.admin);
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('adminToken');
        navigate('/admin-login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const login = async (email: string, password: string) => {
    try {
      const response = await adminApi.login(email, password);
      localStorage.setItem('adminToken', response.data.token);
      setIsAuthenticated(true);
      setAdmin(response.data.admin);
      navigate('/admin');
      return { success: true };
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setAdmin(null);
    navigate('/admin-login');
  };

  return {
    isAuthenticated,
    isLoading,
    admin,
    login,
    logout
  };
};
