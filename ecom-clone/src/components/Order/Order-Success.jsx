import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="flex flex-col items-center text-center p-8 rounded-lg shadow-lg bg-white">
        {/* 3D Illustration */}
        <div className="w-64 h-64 relative mb-6">
          <img
            src="https://img.freepik.com/free-vector/online-order-delivery-service-shipment-internet-shop-basket-cardboard-boxes-buyer-with-laptop-delivery-note-monitor-screen-parcel_335657-1169.jpg?t=st=1735379614~exp=1735383214~hmac=df1cf60ab6ce52ab4395c17f7727d952b80dcdb6c4393913cfc80988afdb33b3&w=740" // Replace with an actual attractive 3D illustration URL
            alt="Order Success"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Confirmation Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been successfully processed, and we are preparing it for shipment.
        </p>

        {/* Order Summary */}
        <div className="flex flex-col items-center bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-lg text-white shadow-md w-full max-w-sm">
          <FaCheckCircle className="text-5xl mb-4" />
          <p className="font-semibold text-lg">Order #123456</p>
          <p className="text-sm">Expected Delivery: Dec 31, 2024</p>
        </div>

        {/* Action Button */}
        <div className='flex gap-5'>

        <button className="mt-6 px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-lg">
          <Link to="/">
          Continue Shopping
          </Link>
        </button>
        <button className="mt-6 px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-lg">
          <Link to="/Orders">
          Go to Orders
          </Link>
        </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
