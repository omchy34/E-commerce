import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    FullName: '',
    Email: '',
    Password: '',
    Phone: ''
  });
  const navigate = useNavigate() ;

  async function Register(e) {
    e.preventDefault();
    const res = await axios.post("/api/v1/users/Register", formData, {
      withCredentials: true
    });
    console.log(res);
    
    if(res){
      if(res.data.user.AccessToken){
        navigate('/Profile')
      }
    }

  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-black flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-md p-4 sm:p-6 w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Create your account
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Full Name */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              name="FullName"
              className="w-full px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
              value={formData.FullName}
              onChange={handleChange}
              required
            />
          </div>

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

          {/* Phone */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
            <input
              type="text"
              name="Phone"
              className="w-full px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="(123) 456-7890"
              value={formData.Phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={Register}
            className="w-full bg-yellow-500 text-white py-2 text-sm rounded-md hover:bg-yellow-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account */}
        <p className="text-center text-sm text-gray-600 mt-3">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;