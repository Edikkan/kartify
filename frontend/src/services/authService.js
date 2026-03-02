import api from './api';

const authService = {
  setToken(token) {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  },

  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  async register(userData) {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  async getProfile() {
    const response = await api.get('/auth/me');
    return response.data;
  },

  async updateProfile(userData) {
    const response = await api.put('/auth/profile', userData);
    return response.data;
  },

  async changePassword(passwordData) {
    const response = await api.put('/auth/change-password', passwordData);
    return response.data;
  },

  async forgotPassword(email) {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  async resetPassword(token, password) {
    const response = await api.post(`/auth/reset-password/${token}`, { password });
    return response.data;
  },
};

export default authService;
