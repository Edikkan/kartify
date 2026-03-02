import api from './api';

const productService = {
  async getAll(params = {}) {
    const response = await api.get('/products', { params });
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  async search(query) {
    const response = await api.get('/products/search', { params: { q: query } });
    return response.data;
  },

  async getCategories() {
    const response = await api.get('/categories');
    return response.data;
  },

  async getByCategory(categoryId, params = {}) {
    const response = await api.get(`/categories/${categoryId}/products`, { params });
    return response.data;
  },

  async getFeatured(limit = 8) {
    const response = await api.get('/products/featured', { params: { limit } });
    return response.data;
  },

  async getDeals() {
    const response = await api.get('/products/deals');
    return response.data;
  },

  async create(productData) {
    const response = await api.post('/products', productData);
    return response.data;
  },

  async update(id, productData) {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

export default productService;
