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
      const { productId, quantity = 1, productData } = action.payload;
      const existingItem = state.items.find(item => item.id === productId);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        // Если товара нет в корзине, добавляем его с переданным количеством и данными
        state.items.push({ 
          id: productId, 
          quantity: quantity,
          productData: productData || null, // Сохраняем данные о товаре
        });
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

// Селекторы
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalCount = (state) => state.cart.totalCount;
export const selectCartItemById = (id) => (state) => 
  state.cart.items.find(item => item.id === id);

// Селектор для расчета общей суммы корзины
export const selectCartTotal = (state) => {
  return state.cart.items.reduce((total, item) => {
    const productData = item.productData;
    if (!productData) return total;
    
    // Если есть скидка, используем цену со скидкой
    const price = productData.discont_price || productData.price;
    return total + (price * item.quantity);
  }, 0);
};

export default cartSlice.reducer;
