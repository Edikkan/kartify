import api from './api';

const orderService = {
  async getAll(params = {}) {
    const response = await api.get('/orders', { params });
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  async create(orderData) {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  async updateStatus(id, status) {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data;
  },

  async cancel(id) {
    const response = await api.put(`/orders/${id}/cancel`);
    return response.data;
  },

  async getMyOrders(params = {}) {
    const response = await api.get('/orders/my', { params });
    return response.data;
  },
};

export default orderService;
