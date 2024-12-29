import React, { useState, useEffect } from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from "axios";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredOrders = filter === 'All' ? orders : orders.filter(order => order.status === filter);

  useEffect(() => {
    async function getOrder() {
      const response = await axios.get("/api/v1/admin/fetchAllOrders");
      setOrders(response.data.orders);
      console.log(response);
    }

    getOrder();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-purple-800">Order Management</h1>

      <div className="flex mb-4">
        <label className="mr-2 text-lg font-semibold text-gray-700">Filter by Status:</label>
        <select
          value={filter}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-lg p-2 bg-white shadow-md text-purple-700 focus:outline-none focus:ring focus:ring-purple-300 transition duration-300"
        >
          <option value="All">All</option>
          <option value="Shipped">Shipped</option>
          <option value="Pending">Pending</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="p-3 text-lg text-center">Order ID</th>
              <th className="p-3 text-lg text-center">Customer Name</th>
              <th className="p-3 text-lg text-center">Order Date</th>
              <th className="p-3 text-lg text-center">Payment Status</th>
              <th className="p-3 text-lg text-center">Order Status</th>
              <th className="p-3 text-lg text-center">Amount</th>
              <th className="p-3 text-lg text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map(order => (
                <tr key={order._id} className="hover:bg-gray-100 transition duration-300 text-center">
                  <td className="p-3 font-medium text-gray-700">{order.razorpayOrderId}</td>
                  <td className="p-3 font-medium text-gray-700">{order.user ? order.user.FullName : "N/A"}</td>
                  <td className="p-3 font-medium text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</td>

                  {/* Payment Status */}
                  <td className={`p-3 font-medium ${order.paymentStatus === 'SUCCESS' ? 'text-green-600' : order.paymentStatus === 'PENDING' ? 'text-red-600' : 'text-yellow-600'}`}>
                    <span className={`inline-block px-2 py-1 text-xs font-bold rounded-full ${order.paymentStatus === 'SUCCESS' ? 'bg-green-200' : order.paymentStatus === 'PENDING' ? 'bg-red-200' : 'bg-yellow-200'}`}>
                      {order.paymentStatus}
                    </span>
                  </td>

                  {/* Order Status */}
                  <td className={`p-3 font-medium ${order.status === 'Shipped' ? 'text-yellow-600' : order.status === 'Pending' ? 'text-orange-600' : 'text-green-600'}`}>
                    <span className={`inline-block px-2 py-1 text-xs font-bold rounded-full ${order.status === 'Shipped' ? 'bg-yellow-200' : order.status === 'Pending' ? 'bg-orange-200' : 'bg-green-200'}`}>
                      {order.status}
                    </span>
                  </td>

                  <td className="p-3 font-medium text-gray-700">₹{order.subtotal}</td>
                  <td className="p-3 flex justify-center space-x-4">
                    <Link to={`/orderdetails/${order._id}`} className="text-blue-500 hover:text-blue-600 transition duration-300" title="View Order">
                      <FaEye />
                    </Link>
                    <button className="text-red-500 hover:text-red-600 transition duration-300" title="Delete Order">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
