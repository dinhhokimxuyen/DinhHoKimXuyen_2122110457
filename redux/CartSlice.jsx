// CartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      const productIndex = state.items.findIndex((item) => item.id === action.payload.id);
      if (productIndex !== -1) {
        state.items[productIndex].quantity += 1;
        state.items[productIndex].total += action.payload.price;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    incrementQuantity: (state, action) => {
      const productIndex = state.items.findIndex((item) => item.id === action.payload);
      if (productIndex !== -1) {
        state.items[productIndex].quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const productIndex = state.items.findIndex((item) => item.id === action.payload);
      if (productIndex !== -1 && state.items[productIndex].quantity > 1) {
        state.items[productIndex].quantity -= 1;
      } else {
        state.items.splice(productIndex, 1);
      }
    },
    clearCart: (state) => {
      state.items = []; // Clear all items from the cart
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
