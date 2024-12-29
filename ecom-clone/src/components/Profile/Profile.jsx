import React, { useEffect, useState } from 'react';
import { FaUser, FaBoxOpen, FaHeart, FaMapMarkerAlt, FaCog, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Profile = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

const AccessToken = Cookies.get('AccessToken'); 

  useEffect(() => {
    if (AccessToken) {
      async function userData() {
        try {
          const res = await axios.get('/api/v1/users/userData', {
            withCredentials: true,
          });
          console.log(res);
          setUserName(res.data.userData.FullName);
          setEmail(res.data.userData.Email);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }

      userData();
    }
  }, [AccessToken]);  

  return (
    <div className="bg-gray-100 min-h-screen py-8 pt-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* User Avatar */}
            <div className="w-20 h-20 rounded-full bg-gray-300 flex justify-center items-center">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/048/216/761/small/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png"
                alt="User Avatar"
              />
            </div>
            {/* User Info */}
            <div>
              <h2 className="text-2xl font-semibold">{userName}</h2>
              <p className="text-gray-600">{email}</p>
            </div>
          </div>
          <Link to="/EditProfile" className="mt-4 md:mt-0 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Edit Profile
          </Link>
        </div>

        {/* Orders, Wishlist, Cart, Address, Settings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Orders Section */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaBoxOpen size={40} className="text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your Orders</h3>
            <p className="text-gray-600">Track and manage your orders</p>
            <Link to="/Orders" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              View Orders
            </Link>
          </div>

          {/* Wishlist Section */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaHeart size={40} className="text-red-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your Wishlist</h3>
            <p className="text-gray-600">View and manage saved items</p>
            <Link to="WishList" className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              View Wishlist
            </Link>
          </div>

          {/* Cart Section */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaShoppingCart size={40} className="text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your Cart</h3>
            <p className="text-gray-600">checkout items in your cart</p>
            <Link to="/Cart" className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              View Cart
            </Link>
          </div>

          {/* Address Section */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaMapMarkerAlt size={40} className="text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your Addresses</h3>
            <p className="text-gray-600">Manage your shipping addresses</p>
            <Link to="/address" className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Manage Address
            </Link>
          </div>

          {/* Settings Section */}
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <FaCog size={40} className="text-gray-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Account Settings</h3>
            <p className="text-gray-600">Payments, security, and more</p>
            <Link to="/Settings" className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              View Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
