import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

// Attach JWT token to every request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('berttam_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Auth ─────────────────────────────────────────
export const login = (data) => API.post('/auth/login', data);

// ─── Menus ────────────────────────────────────────
export const getMenus = (category) =>
  API.get('/menus', { params: category && category !== 'Semua' ? { category } : {} });
export const createMenu = (formData) => API.post('/menus', formData);
export const updateMenu = (id, formData) => API.put(`/menus/${id}`, formData);
export const deleteMenu = (id) => API.delete(`/menus/${id}`);

// ─── Events ───────────────────────────────────────
export const getEvents = () => API.get('/events');
export const getEventById = (id) => API.get(`/events/${id}`);
export const createEvent = (formData) => API.post('/events', formData);
export const updateEvent = (id, formData) => API.put(`/events/${id}`, formData);
export const deleteEvent = (id) => API.delete(`/events/${id}`);

// ─── Galleries ────────────────────────────────────
export const getGalleries = () => API.get('/galleries');
export const createGallery = (formData) => API.post('/galleries', formData);
export const deleteGallery = (id) => API.delete(`/galleries/${id}`);

export default API;

// ─── Orders ───────────────────────────────────────
export const createOrder = (data) => API.post('/orders', data);
export const getOrders = () => API.get('/orders');
export const getOrderById = (id) => API.get(`/orders/${id}`);
export const updateOrderStatus = (id, status) => API.put(`/orders/${id}/status`, { status });
