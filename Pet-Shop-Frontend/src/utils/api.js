import axios from 'axios'

// Базовая конфигурация API
const API_BASE_URL = 'http://localhost:3333'

// Утилита для создания полного URL изображения
export const getImageUrl = (imagePath) => {
  if (!imagePath) return ''
  if (imagePath.startsWith('http')) return imagePath
  return `${API_BASE_URL}${imagePath}`
}

// Создаем экземпляр axios с базовой конфигурацией
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 секунд
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor для обработки ответов
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

// API методы для категорий
export const categoriesAPI = {
  // Получить все категории
  getAll: () => api.get('/categories/all'),
  
  // Получить категорию по ID
  getById: (id) => api.get(`/categories/${id}`),
}

// API методы для товаров
export const productsAPI = {
  // Получить все товары
  getAll: () => api.get('/products/all'),
  
  // Получить товар по ID
  getById: (id) => api.get(`/products/${id}`),
  
  // Получить товары по категории
  getByCategory: (categoryId) => api.get(`/categories/${categoryId}`),
  
  // Получить товары со скидкой (фильтруем все товары)
  getSales: async () => {
    const response = await api.get('/products/all')
    // Фильтруем товары, у которых есть discont_price
    const saleProducts = response.data.filter(product => 
      product.discont_price !== null && 
      product.discont_price !== undefined && 
      product.discont_price < product.price
    )
    return { ...response, data: saleProducts }
  },
}

export default api
