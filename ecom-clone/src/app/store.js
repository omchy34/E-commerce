import { configureStore } from '@reduxjs/toolkit'
import CartReducer from "../features/AddToCart/AddToCart" ;
import WishlistReducer from "../features/WishList/WishList"

export default configureStore({
  reducer: {
    Addtocart : CartReducer ,
    Wishlist : WishlistReducer ,
  },
})