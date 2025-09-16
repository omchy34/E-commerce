import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/AddToCart/AddToCart'
import wishlistReducer from '../features/wishlist/WishList'
import authReducer from '../features/auth/authSlice'

const store = configureStore({
  reducer: {
    Addtocart : cartReducer ,
    Wishlist : wishlistReducer ,
    auth: authReducer,
  },
})

export default store
