import axios from 'axios';
import { API_BASE_URL } from '@/lib/api-url';

// Create axios instance with auth token
const getAuthHeader = () => {
  const token = localStorage.getItem('adminToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const adminApi = {
  // Auth
  login: (email, password) =>
    axios.post(`${API_BASE_URL}/auth/login`, { email, password }),

  register: (email, password, adminSecret) =>
    axios.post(`${API_BASE_URL}/auth/register`, { email, password, adminSecret }),

  getMe: () =>
    axios.get(`${API_BASE_URL}/auth/me`, { headers: getAuthHeader() }),

  // Blog
  createBlog: (data) =>
    axios.post(`${API_BASE_URL}/blog`, data, { headers: getAuthHeader() }),

  getAllBlogs: () =>
    axios.get(`${API_BASE_URL}/blog`),

  getBlogBySlug: (slug) =>
    axios.get(`${API_BASE_URL}/blog/${slug}`),

  updateBlog: (id, data) =>
    axios.put(`${API_BASE_URL}/blog/${id}`, data, { headers: getAuthHeader() }),

  deleteBlog: (id) =>
    axios.delete(`${API_BASE_URL}/blog/${id}`, { headers: getAuthHeader() }),

  // Activity
  createActivity: (data) =>
    axios.post(`${API_BASE_URL}/activity`, data, { headers: getAuthHeader() }),

  getAllActivities: () =>
    axios.get(`${API_BASE_URL}/activity`),

  getActivityById: (id) =>
    axios.get(`${API_BASE_URL}/activity/${id}`),

  updateActivity: (id, data) =>
    axios.put(`${API_BASE_URL}/activity/${id}`, data, { headers: getAuthHeader() }),

  deleteActivity: (id) =>
    axios.delete(`${API_BASE_URL}/activity/${id}`, { headers: getAuthHeader() }),

  // Gallery
  uploadImage: (data) =>
    axios.post(`${API_BASE_URL}/gallery`, data, { headers: getAuthHeader() }),

  getAllImages: () =>
    axios.get(`${API_BASE_URL}/gallery`),

  deleteImage: (id) =>
    axios.delete(`${API_BASE_URL}/gallery/${id}`, { headers: getAuthHeader() }),

  // Analytics
  getAnalytics: () =>
    axios.get(`${API_BASE_URL}/analytics`, { headers: getAuthHeader() }),

  // Donations
  getAllDonations: () =>
    axios.get(`${API_BASE_URL}/donate`, { headers: getAuthHeader() }),

  getDonationStats: () =>
    axios.get(`${API_BASE_URL}/donate/stats`, { headers: getAuthHeader() }),

  // Volunteers
  getAllVolunteers: () =>
    axios.get(`${API_BASE_URL}/volunteer`, { headers: getAuthHeader() }),

  getVolunteerStats: () =>
    axios.get(`${API_BASE_URL}/volunteer/stats`, { headers: getAuthHeader() }),

  updateVolunteer: (id, data) =>
    axios.put(`${API_BASE_URL}/volunteer/${id}`, data, { headers: getAuthHeader() }),

  deleteVolunteer: (id) =>
    axios.delete(`${API_BASE_URL}/volunteer/${id}`, { headers: getAuthHeader() })
};
