// utils/validateAuth.js
import axiosInstance from "../utils/axiosInstance.js";
import { setLoading, setUser, setUnauthenticated } from "../features/auth/authSlice.js";

export const validateAuth = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await axiosInstance.get("/api/v1/users/userData", {
      withCredentials: true,
    });
    dispatch(setUser(res.data.userData));
  } catch (err) {
    console.error("❌ Auth error:", err);
    // Don't treat auth failure as an error state - just set as unauthenticated
    dispatch(setUnauthenticated());
  }
};