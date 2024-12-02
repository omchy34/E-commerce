import React, { useState } from 'react';
import Logo from "../.././assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    Email: '',
    Password: '',
  });

  const navigate = useNavigate();

  async function Login(e) {
    e.preventDefault();
    const res = await axios.post("/api/v1/users/Login", formData, {
      withCredentials: true,
    });

    console.log(res);
    navigate("/Profile");
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-md p-4 sm:p-6 w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-4">
          <img
            src={Logo}
            alt="E-Commerce Logo"
            className="mx-auto mb-2 h-12"
          />
          <h2 className="text-2xl font-semibold text-gray-800">Log In</h2>
        </div>

        {/* Form */}
        <form onSubmit={Login} className="space-y-3">
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email Address</label>
            <input
              type="email"
              name="Email"
              className="w-full px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              value={formData.Email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="Password"
              className="w-full px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
              value={formData.Password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 text-sm rounded-md hover:bg-yellow-600 transition duration-300"
          >
            Log In
          </button>
        </form>

        {/* Additional Links */}
        <div className="flex justify-between mt-3 text-sm">
          <a href="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </a>
          <p className="text-gray-600">
            New here?{' '}
            <Link to="/RegistrationForm" className="text-blue-500 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
