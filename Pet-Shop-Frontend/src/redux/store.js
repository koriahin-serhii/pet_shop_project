import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './Slices/cartSlice'
import categoriesReducer from './Slices/categoriesSlice'
import productsReducer from './Slices/productsSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoriesReducer,
    products: productsReducer,
  },
})
