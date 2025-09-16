// src/components/auth/RegistrationForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux'; // Add this import
import { setUser } from '../../features/auth/authSlice'; // Add this import
import axiosInstance from '../../utils/axiosInstance.js';
import 'react-toastify/dist/ReactToastify.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    FullName: '',
    Email: '',
    Password: '',
    Phone: ''
  });
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Add this line

  const Register = async (e) => {
    e.preventDefault();

    if (formData.Password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const res = await axiosInstance.post(`/api/v1/users/Register`, formData, {
        withCredentials: true,
      });

      if (res.data && res.data.user) {
        // Update Redux state with user data
        dispatch(setUser(res.data.user)); // Add this line
        
        toast.success('Registration successful! Redirecting...');
        setTimeout(() => navigate('/Profile'), 2000);
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Something went wrong';
      toast.error(message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-black flex justify-center items-center">
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-md p-4 sm:p-6 w-full max-w-sm">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Create your account</h2>
        </div>
        <form onSubmit={Register} className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
            <input type="text" name="FullName" className="w-full px-3 py-1.5 text-sm border rounded-md"
              placeholder="John Doe" value={formData.FullName} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email Address</label>
            <input type="email" name="Email" className="w-full px-3 py-1.5 text-sm border rounded-md"
              placeholder="you@example.com" value={formData.Email} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Phone</label>
            <input type="tel" name="Phone" className="w-full px-3 py-1.5 text-sm border rounded-md"
              placeholder="1234567890" value={formData.Phone} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input type="password" name="Password" className="w-full px-3 py-1.5 text-sm border rounded-md"
              placeholder="********" value={formData.Password} onChange={handleChange} required />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 text-sm rounded-md hover:bg-blue-700 transition duration-300">
            Register
          </button>
        </form>
        
        {/* Already have account - Login link */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/Login')}
              className="text-blue-600 hover:text-blue-800 font-medium underline"
            >
              Log in here
            </button>
          </p>
        </div>
        
        {/* Forgot Password link */}
        <div className="text-center mt-2">
          <button
            onClick={() => navigate('/forgot-password')}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Forgot your password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;