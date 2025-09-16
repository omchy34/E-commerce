// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import Logo from "../../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'; // Add this import
import { setUser } from '../../features/auth/authSlice'; // Add this import
import axiosInstance from '../../utils/axiosInstance.js';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Add this line
  const [formData, setFormData] = useState({
    Email: '',
    Password: '',
  });
  const [loading, setLoading] = useState(false);

  const Login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post(`/api/v1/users/Login`, formData, {
        withCredentials: true,
      });

      setLoading(false);
      if (res.status === 200) {
        // Update Redux state with user data
        dispatch(setUser(res.data.user)); // Add this line
        
        toast.success("Login successful!");
        navigate("/Profile"); // or navigate("/") for home page
      } else {
        toast.error(res.data.message || "Something went wrong!");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Login failed! Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-md p-4 sm:p-6 w-full max-w-sm">
        <div className="text-center mb-4">
          <img src={Logo} alt="E-Commerce Logo" className="mx-auto mb-2 h-12" />
          <h2 className="text-2xl font-semibold text-gray-800">Log In</h2>
        </div>
        <form onSubmit={Login} className="space-y-3" aria-busy={loading}>
          <div>
            <label className="block text-sm text-gray-600 mb-1" htmlFor="email">Email Address</label>
            <input type="email" id="email" name="Email" className="w-full px-3 py-1.5 text-sm border rounded-md"
              placeholder="you@example.com" value={formData.Email} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1" htmlFor="password">Password</label>
            <input type="password" id="password" name="Password" className="w-full px-3 py-1.5 text-sm border rounded-md"
              placeholder="********" value={formData.Password} onChange={handleChange} required />
          </div>
          <button type="submit" className="w-full bg-yellow-500 text-white py-2 text-sm rounded-md hover:bg-yellow-600 transition duration-300">
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;