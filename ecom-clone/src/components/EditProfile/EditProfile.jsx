import React, { useState, useEffect } from 'react';
import { FaUserEdit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setUser } from '../../features/auth/authSlice.js';
import axiosInstance from '../../utils/axiosInstance.js';

const EditProfile = () => {
  // Get user data from Redux instead of making separate API call
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  // State to handle form inputs
  const [formData, setFormData] = useState({
    FullName: '',
    Phone: '',
    Email: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form with user data when component mounts or user changes
  useEffect(() => {
    if (user) {
      setFormData({
        FullName: user.FullName || '',
        Phone: user.Phone || '',
        Email: user.Email || '',
      });
    }
  }, [user]);

  // If not authenticated, show message
  if (!isAuthenticated) {
    return (
      <div className="bg-gray-100 min-h-screen py-20 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Please Login</h2>
          <p className="text-gray-600">You need to be logged in to edit your profile.</p>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen py-20 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.FullName.trim()) {
      toast.error('Full name is required');
      return;
    }
    
    if (!formData.Email.trim()) {
      toast.error('Email is required');
      return;
    }
    
    if (!formData.Phone.trim()) {
      toast.error('Phone number is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await axiosInstance.put('/api/v1/users/updateProfile', formData, {
        withCredentials: true,
      });

      if (res.data && res.data.user) {
        // Update Redux state with new user data
        dispatch(setUser(res.data.user));
        toast.success('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      const message = error.response?.data?.message || 'Failed to update profile';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-20">
      <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
        {/* Header */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex items-center space-x-4">
          <FaUserEdit size={40} className="text-green-500" />
          <div>
            <h2 className="text-2xl font-semibold">Edit Profile</h2>
            <p className="text-gray-600 text-sm">Update your personal information</p>
          </div>
        </div>

        {/* Edit Profile Form */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            {/* Full Name Field */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="FullName">
                Full Name *
              </label>
              <input
                type="text"
                id="FullName"
                name="FullName"
                value={formData.FullName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="Email">
                Email Address *
              </label>
              <input
                type="email"
                id="Email"
                name="Email"
                value={formData.Email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your email address"
                required
              />
            </div>

            {/* Phone Number Field */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="Phone">
                Phone Number *
              </label>
              <input
                type="tel"
                id="Phone"
                name="Phone"
                value={formData.Phone}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your phone number"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 rounded-md font-medium transition-colors ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                } text-white`}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
              
              <button
                type="button"
                onClick={() => {
                  // Reset form to original user data
                  if (user) {
                    setFormData({
                      FullName: user.FullName || '',
                      Phone: user.Phone || '',
                      Email: user.Email || '',
                    });
                  }
                }}
                className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;