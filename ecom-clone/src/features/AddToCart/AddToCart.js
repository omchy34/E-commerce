import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        Addtocart(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(
                (item) => item.ProductId === newItem.ProductId
            );
        
            if (existingItem) {
                existingItem.Quantity = newItem.Quantity;
                existingItem.SubTotal = newItem.SubTotal;
            } else {
                state.cartItems.push(newItem);
            }
        },
        
        setCartItems(state, action) {
            state.cartItems = action.payload;
        },

        removeFromCart(state, action) {
            const id = action.payload;
            state.cartItems = state.cartItems.filter(
                (item) => item.ProductId !== id
            );
        },
    },
});

export const { Addtocart, setCartItems, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
