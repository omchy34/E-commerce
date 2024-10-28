import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const AddtocartSlice = createSlice({
  name: 'Addtocart',
  initialState,
  reducers: {
    Addtocart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(item => item._id === newItem._id);
  
      if (!existingItem) {
        state.cartItems.push({
          ...newItem,
          Quantity: 1, 
        });
      }
    },

    updateCartQuantity(state, action) {
      const { id, change } = action.payload;
      const existingItem = state.cartItems.find(item => item._id === id);
      
      if (existingItem) {
        existingItem.Quantity = Math.max(1, existingItem.Quantity + change); // Update quantity, preventing it from going below 1
      }
    },
    
    removeFromCart(state, action) {
      const id = action.payload;
      state.cartItems = state.cartItems.filter(item => item._id !== id);
    },
  },
});

export const { Addtocart, removeFromCart , updateCartQuantity } = AddtocartSlice.actions;

export default AddtocartSlice.reducer;
