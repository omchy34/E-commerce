import React, { useState, useEffect } from 'react';
import { FaUserEdit } from 'react-icons/fa';
import axios from 'axios'

const EditProfile = () => {
  // State to handle form inputs
  const [formData, setFormData] = useState({
    FullName:'',
    Phone:'',
    Email:'',
  });

  useEffect(() => {
    async function userData() {
      const res = await axios.get("https://e-commerceserver-uu0f.onrender.com/api/v1/users/userData", {
        withCredentials: true,
      });

      console.log(res);
      setFormData(res.data.userData)
    }

    userData();
  }, []);

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
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="FullName">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="FullName"
                      name="FullName"
                      value={formData.FullName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="Email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="Email"
                      name="Email"
                      value={formData.Email}
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
                      name="Phone"
                      value={formData.Phone}
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
