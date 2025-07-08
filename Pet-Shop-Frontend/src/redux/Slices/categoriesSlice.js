import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { categoriesAPI } from '../../utils/api'

// Fallback данные для демонстрации
const fallbackCategories = [
  {
    id: 1,
    title: 'Dry & Wet Food',
    image: '/src/assets/images/home-banner.png'
  },
  {
    id: 2,
    title: 'Litter Boxes & Litter Trays',
    image: '/src/assets/images/home-banner.png'
  },
  {
    id: 3,
    title: 'Baskets & Beds',
    image: '/src/assets/images/home-banner.png'
  },
  {
    id: 4,
    title: 'Toys',
    image: '/src/assets/images/home-banner.png'
  },
  {
    id: 5,
    title: 'Care & Grooming',
    image: '/src/assets/images/home-banner.png'
  },
  {
    id: 6,
    title: 'Snacks & Supplements',
    image: '/src/assets/images/home-banner.png'
  },
  {
    id: 7,
    title: 'Runs & Fencing',
    image: '/src/assets/images/home-banner.png'
  },
  {
    id: 8,
    title: 'Trees & Scratching',
    image: '/src/assets/images/home-banner.png'
  }
]

// Async thunk для загрузки категорий
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    try {
      const response = await categoriesAPI.getAll()
      return response.data
    } catch {
      console.log('Server not available, using fallback data')
      // Возвращаем fallback данные вместо ошибки
      return fallbackCategories
    }
  }
)

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    loading: false,
    error: null,
    initialized: false
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
        state.initialized = true
        state.error = null
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || 'Failed to load categories'
        // Используем fallback данные даже при ошибке
        state.items = fallbackCategories
        state.initialized = true
      })
  }
})

export const { clearError } = categoriesSlice.actions

// Селекторы
export const selectCategories = (state) => state.categories.items
export const selectCategoriesLoading = (state) => state.categories.loading
export const selectCategoriesError = (state) => state.categories.error
export const selectCategoriesInitialized = (state) => state.categories.initialized

export default categoriesSlice.reducer
