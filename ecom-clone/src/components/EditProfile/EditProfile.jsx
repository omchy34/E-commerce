import React, { useState } from 'react';
import { FaUserEdit } from 'react-icons/fa';

const EditProfile = () => {
  // State to handle form inputs
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    address: '123 Main St, City, Country',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (API call to update profile, etc.)
    console.log('Profile Updated:', formData);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex items-center space-x-4">
          <FaUserEdit size={40} className="text-green-500" />
          <h2 className="text-2xl font-semibold">Edit Profile</h2>
        </div>

        {/* Edit Profile Form */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
              />
            </div>

            {/* Phone Number Field */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
