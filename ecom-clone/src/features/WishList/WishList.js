import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    Wishlist: [],
};

const WishlistSlice = createSlice({
    name: 'Wishlist',
    initialState,
    reducers: {
        Addtowishlist(state, action) {
            const newItem = action.payload;
            const existingItem = state.Wishlist.find(item => item._id === newItem._id);

            if (!existingItem) {
                state.Wishlist.push({
                    ...newItem
                });
            }
        },
        Removefromwishlist(state, action) {
            const id = action.payload;
            state.Wishlist = state.Wishlist.filter(item => item._id !== id);
        },
    },
});

export const { Addtowishlist, Removefromwishlist } = WishlistSlice.actions;

export default WishlistSlice.reducer;
