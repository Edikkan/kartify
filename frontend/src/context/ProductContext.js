import { createContext, useState, useCallback } from 'react';
import productService from '@/services/productService';

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getAll(params);
      setProducts(data.products || data);
      if (data.categories) {
        setCategories(data.categories);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProductById = useCallback(async (id) => {
    try {
      setLoading(true);
      const data = await productService.getById(id);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const data = await productService.getCategories();
      setCategories(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchProducts = useCallback(async (query) => {
    try {
      setLoading(true);
      const data = await productService.search(query);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    products,
    categories,
    loading,
    error,
    fetchProducts,
    fetchProductById,
    fetchCategories,
    searchProducts,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}
