import React, { useState } from 'react';

const OrderDetails = () => {
  const [order, setOrder] = useState({
    id: 1,
    customerName: 'John Doe',
    customerEmail: 'john.doe@example.com',
    customerPhone: '123-456-7890',
    shippingAddress: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zipCode: '90210',
    paymentMode: 'Credit Card',
    amount: 150,
    items: [
      { id: 1, name: 'Product A', quantity: 1, price: 50 },
      { id: 2, name: 'Product B', quantity: 2, price: 50 },
    ],
    status: 'Processing',
  });

  const [status, setStatus] = useState(order.status);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdateStatus = () => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      status: status,
    }));
    alert('Order status updated!');
  };

  return (
    <div className="p-8 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        {/* Header Section */}
        <div className="bg-purple-700 text-white p-6 rounded-t-lg">
          <h1 className="text-4xl font-bold text-center tracking-wider">Order Details</h1>
        </div>

        {/* Order Info Section */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Order ID: #{order.id}</h2>

          {/* Customer Information */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-600 mb-3">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p><strong className="text-gray-700">Name:</strong> {order.customerName}</p>
              <p><strong className="text-gray-700">Email:</strong> {order.customerEmail}</p>
              <p><strong className="text-gray-700">Phone:</strong> {order.customerPhone}</p>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-600 mb-3">Shipping Address</h3>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p>{order.shippingAddress}, {order.city}, {order.state} {order.zipCode}</p>
            </div>
          </div>

          {/* Payment Information */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-600 mb-3">Payment Information</h3>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p><strong className="text-gray-700">Payment Mode:</strong> {order.paymentMode}</p>
              <p><strong className="text-gray-700">Total Amount:</strong> ${order.amount}</p>
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
                  {order.items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="p-4 border-b border-gray-200">{item.name}</td>
                      <td className="p-4 text-center border-b border-gray-200">{item.quantity}</td>
                      <td className="p-4 text-right border-b border-gray-200">${item.price}</td>
                    </tr>
                  ))}
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
              >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button
                onClick={handleUpdateStatus}
                className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition ease-in-out duration-300 shadow-md"
              >
                Update Status
              </button>
            </div>
          </div>

          {/* Back to Orders Button */}
          <div className="flex justify-end mt-8">
            <button className="bg-purple-600 text-white py-3 px-8 rounded-lg hover:bg-purple-700 transition ease-in-out duration-300 shadow-md">
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
