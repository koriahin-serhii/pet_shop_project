import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalCount = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalCount = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id);
        }
      }
      state.totalCount = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    clearCart(state) {
      state.items = [];
      state.totalCount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
