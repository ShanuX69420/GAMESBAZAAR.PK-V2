import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login/', credentials),
  register: (userData) => api.post('/auth/register/', userData),
  logout: () => api.post('/auth/logout/'),
  getProfile: () => api.get('/auth/user/'),
};

export const listingsAPI = {
  getListings: (params) => api.get('/listings/', { params }),
  createListing: (data) => api.post('/listings/', data),
  getListing: (id) => api.get(`/listings/${id}/`),
  updateListing: (id, data) => api.put(`/listings/${id}/`, data),
  deleteListing: (id) => api.delete(`/listings/${id}/`),
};

export const gamesAPI = {
  getGames: () => api.get('/games/'),
  searchGames: (query) => api.get('/games/search/', { params: { q: query } }),
};

export default api;