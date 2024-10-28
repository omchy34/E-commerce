import { configureStore } from '@reduxjs/toolkit'
import AddtocartReducer from "../features/AddToCart/AddToCart" ;
import WishlistReducer from "../features/WishList/WishList"

export default configureStore({
  reducer: {
    Addtocart : AddtocartReducer ,
    Wishlist : WishlistReducer ,
  },
})