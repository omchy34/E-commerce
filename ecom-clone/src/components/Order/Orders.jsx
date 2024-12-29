import React, { useEffect, useState } from 'react';
import axios from "axios";
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineExclamationCircle } from 'react-icons/ai'; // Status icons

const Orders = () => {
  const [ordersData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    async function FtechOrder() {
      try {
        const res = await axios.get('/api/v1/admin/FetchOrder');
        console.log(res);
        setOrderData(res.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    }

    FtechOrder();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-semibold mb-6 text-center text-blue-700">My Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ordersData.map(order => (
          <div key={order._id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Order ID: {order._id}</span>
              <div className={`text-sm font-medium flex items-center ${order.paymentStatus === 'SUCCESS' ? 'text-green-500' : order.paymentStatus === 'PENDING' ? 'text-yellow-500' : 'text-red-500'}`}>
                {order.paymentStatus === 'SUCCESS' && <AiOutlineCheckCircle className="mr-2" />}
                {order.paymentStatus === 'PENDING' && <AiOutlineExclamationCircle className="mr-2" />}
                {order.paymentStatus === 'FAILED' && <AiOutlineCloseCircle className="mr-2" />}
                {order.paymentStatus}
              </div>
            </div>
            <div className="text-sm text-gray-500 mb-4">
              Order Date: {new Date(order.createdAt).toLocaleDateString('en-GB')} {/* Format the date */}
            </div>
            <div className="mb-4">
              {order.products.map((item, index) => (
                <div key={index} className="flex items-center border-b pb-2 mb-2">
                  <img src={item.Images[0]} alt={item.ProductName} className="w-16 h-16 object-cover mr-2 rounded-lg" />
                  <div className="flex-1">
                    <div className="text-md font-semibold">{item.ProductName}</div>
                    <div className="text-gray-600">Price: ₹{item.Price} (x{item.Quantity})</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center font-bold text-lg text-gray-800">
              <span>Total Amount:</span>
              <span className="text-xl text-blue-600">₹{order.subtotal}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
