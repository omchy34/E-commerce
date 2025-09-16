import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: true, // Start with loading: true
    error: null,
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
    },
    // Add this new action to handle when auth check is complete but user is not authenticated
    setUnauthenticated: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setLoading, setUser, setError, logout, setUnauthenticated } = authSlice.actions;
export default authSlice.reducer;