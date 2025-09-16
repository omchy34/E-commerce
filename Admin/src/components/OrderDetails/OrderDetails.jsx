import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const OrderDetails = () => {
  const { id } = useParams(); // Move useParams to component level
  const navigate = useNavigate();
  
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await axios.get(`http://localhost:5673/api/v1/admin/fetchOrderId/${id}`);
        console.log(res);
        
        if (res.data && res.data.order) {
          setOrder(res.data.order);
          setStatus(res.data.order.status || 'Processing'); // Set initial status
        } else {
          setError('Order data not found');
        }
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to fetch order details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdateStatus = async () => {
    try {
      setUpdating(true);
      
      // Make API call to update status
      const res = await axios.put(`http://localhost:5673/api/v1/admin/updateOrderStatus/${id}`, {
        status: status
      });
      
      if (res.data && res.data.order) {
        setOrder(res.data.order);
        alert('Order status updated successfully!');
      }
    } catch (err) {
      console.error('Error updating order status:', err);
      alert('Failed to update order status. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const handleBackToOrders = () => {
    navigate('/orders');
  };

  if (loading) {
    return (
      <div className="p-8 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center">Loading order details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center text-red-600">{error}</div>
          <div className="text-center mt-4">
            <button 
              onClick={handleBackToOrders}
              className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
            >
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-8 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="text-center">No order found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        {/* Header Section */}
        <div className="bg-purple-700 text-white p-6 rounded-t-lg">
          <h1 className="text-4xl font-bold text-center tracking-wider">Order Details</h1>
        </div>

        {/* Order Info Section */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Order ID: #{order._id || order.id}</h2>

          {/* Customer Information */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-600 mb-3">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p><strong className="text-gray-700">Name:</strong> {order.user?.FullName || order.customerName || 'N/A'}</p>
              <p><strong className="text-gray-700">Email:</strong> {order.user?.email || order.customerEmail || 'N/A'}</p>
              <p><strong className="text-gray-700">Phone:</strong> {order.user?.phone || order.customerPhone || 'N/A'}</p>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-600 mb-3">Shipping Address</h3>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              {order.Address ? (
                <div>
                  <p>{order.Address.street || order.Address.address}</p>
                  <p>{order.Address.city}, {order.Address.state} {order.Address.zipCode || order.Address.postalCode}</p>
                </div>
              ) : (
                <p>{order.shippingAddress || 'No shipping address available'}</p>
              )}
            </div>
          </div>

          {/* Payment Information */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-600 mb-3">Payment Information</h3>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p><strong className="text-gray-700">Payment Status:</strong> {order.paymentStatus || 'N/A'}</p>
              <p><strong className="text-gray-700">Payment ID:</strong> {order.paymentId || 'N/A'}</p>
              <p><strong className="text-gray-700">Total Amount:</strong> ₹{order.subtotal || order.amount || 'N/A'}</p>
            </div>
          </div>

          {/* Order Items Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-600 mb-3">Order Items</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-purple-600 text-white">
                    <th className="p-4 text-left">Item Name</th>
                    <th className="p-4 text-center">Quantity</th>
                    <th className="p-4 text-right">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products && order.products.length > 0 ? (
                    order.products.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="p-4 border-b border-gray-200">{item.name || item.title || 'Product'}</td>
                        <td className="p-4 text-center border-b border-gray-200">{item.quantity || 1}</td>
                        <td className="p-4 text-right border-b border-gray-200">₹{item.price || 'N/A'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="p-4 text-center text-gray-500">No items found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Status Section */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-600 mb-3">Order Status</h3>
            <div className="flex items-center gap-4">
              <select
                value={status}
                onChange={handleStatusChange}
                className="bg-gray-100 text-gray-700 border border-gray-300 p-3 rounded-lg"
                disabled={updating}
              >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button
                onClick={handleUpdateStatus}
                disabled={updating}
                className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition ease-in-out duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updating ? 'Updating...' : 'Update Status'}
              </button>
            </div>
          </div>

          {/* Back to Orders Button */}
          <div className="flex justify-end mt-8">
            <button 
              onClick={handleBackToOrders}
              className="bg-purple-600 text-white py-3 px-8 rounded-lg hover:bg-purple-700 transition ease-in-out duration-300 shadow-md"
            >
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;