import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { productsAPI } from '../../utils/api'

// Async thunks для загрузки товаров
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await productsAPI.getAll()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products')
    }
  }
)

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await productsAPI.getById(id)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product')
    }
  }
)

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await productsAPI.getByCategory(categoryId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products by category')
    }
  }
)

export const fetchSaleProducts = createAsyncThunk(
  'products/fetchSaleProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await productsAPI.getSales()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch sale products')
    }
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    currentProduct: null,
    categoryProducts: [],
    saleProducts: [],
    loading: false,
    error: null,
    initialized: false
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null
    },
    clearCategoryProducts: (state) => {
      state.categoryProducts = []
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
        state.initialized = true
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false
        state.currentProduct = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Fetch products by category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false
        state.categoryProducts = action.payload
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      
      // Fetch sale products
      .addCase(fetchSaleProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSaleProducts.fulfilled, (state, action) => {
        state.loading = false
        state.saleProducts = action.payload
      })
      .addCase(fetchSaleProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { clearError, clearCurrentProduct, clearCategoryProducts } = productsSlice.actions

// Селекторы
export const selectProducts = (state) => state.products.items
export const selectCurrentProduct = (state) => state.products.currentProduct
export const selectCategoryProducts = (state) => state.products.categoryProducts
export const selectSaleProducts = (state) => state.products.saleProducts
export const selectProductsLoading = (state) => state.products.loading
export const selectProductsError = (state) => state.products.error
export const selectProductsInitialized = (state) => state.products.initialized

export default productsSlice.reducer
