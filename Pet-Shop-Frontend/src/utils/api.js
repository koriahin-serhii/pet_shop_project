import axios from 'axios'

// Base API configuration
const API_BASE_URL = 'http://localhost:3333'

// Utility to create full image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return ''
  if (imagePath.startsWith('http')) return imagePath
  return `${API_BASE_URL}${imagePath}`
}

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor for response processing
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

// API methods for categories
export const categoriesAPI = {
  // Get all categories
  getAll: () => api.get('/categories/all'),
  
  // Get category by ID
  getById: (id) => api.get(`/categories/${id}`),
}

// API methods for products
export const productsAPI = {
  // Получить все товары
  getAll: () => api.get('/products/all'),
  
  // Get product by ID
  getById: (id) => api.get(`/products/${id}`),
  
  // Get products by category
  getByCategory: (categoryId) => api.get(`/categories/${categoryId}`),
  
  // Get discounted products (filter all products)
  getSales: async () => {
    const response = await api.get('/products/all')
    // Filter products that have discont_price
    const saleProducts = response.data.filter(product => 
      product.discont_price !== null && 
      product.discont_price !== undefined && 
      product.discont_price < product.price
    )
    return { ...response, data: saleProducts }
  },
}

export default api
