// src/app/store.js

import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/AddToCart/AddToCart'
import wishlistReducer from '../features/WishList/WishList.js'
import authReducer from '../features/auth/authSlice'

const store = configureStore({
  reducer: {
    Addtocart : cartReducer ,
    Wishlist : wishlistReducer ,
    auth: authReducer,
  },
})

export default store
