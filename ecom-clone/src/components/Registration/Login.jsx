import React, { useState } from 'react';
import Logo from "../.././assets/logo.png"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    Email: '',
    Password: '',
  });

  const navigate = useNavigate() ;

  async function Login(e){
    e.preventDefault() ;
    const res = await axios.post("/api/v1/users/Login" , (formData) , {
      withCredentials : true ,
    })

    console.log(res);
    navigate("/")
    
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation and login logic here
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-md p-6 sm:p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <img
            src={Logo}
            alt="E-Commerce Logo"
            className="mx-auto mb-4 h-14 bg-black"
          />
          <h2 className="text-3xl font-semibold text-gray-800">Log In</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-600 mb-1">Email Address</label>
            <input
              type="email"
              name="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              value={formData.Email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
              value={formData.Password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={Login}
            className="w-full bg-yellow-500 text-white py-3 rounded-md hover:bg-yellow-600 transition duration-300"
          >
            Log In
          </button>
        </form>

        {/* Additional Links */}
        <div className="flex justify-between mt-4">
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
