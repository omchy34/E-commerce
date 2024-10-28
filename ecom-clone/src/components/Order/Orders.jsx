// MyOrders.jsx
import React from 'react';

const Orders = () => {
  const ordersData = [
    {
      id: 1,
      date: '2024-10-01',
      status: 'Delivered',
      items: [
        { name: 'Product 1', price: 29.99, quantity: 1, image: 'https://via.placeholder.com/100' },
        { name: 'Product 2', price: 19.99, quantity: 2, image: 'https://via.placeholder.com/100' },
      ],
      totalAmount: 69.97,
    },
    {
      id: 2,
      date: '2024-09-15',
      status: 'Pending',
      items: [
        { name: 'Product 3', price: 39.99, quantity: 1, image: 'https://via.placeholder.com/100' },
      ],
      totalAmount: 39.99,
    },
    {
      id: 3,
      date: '2024-08-20',
      status: 'Cancelled',
      items: [
        { name: 'Product 4', price: 49.99, quantity: 1, image: 'https://via.placeholder.com/100' },
      ],
      totalAmount: 49.99,
    },
    // Add more orders as needed
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">My Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ordersData.map(order => (
          <div key={order.id} className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Order ID: {order.id}</span>
              <span className={`text-sm font-medium ${order.status === 'Delivered' ? 'text-green-500' : order.status === 'Pending' ? 'text-yellow-500' : 'text-red-500'}`}>
                {order.status}
              </span>
            </div>
            <div className="text-sm text-gray-500 mb-2">Order Date: {order.date}</div>
            <div className="mb-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center border-b pb-2 mb-2">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-2 rounded" />
                  <div className="flex-1">
                    <div className="text-md font-semibold">{item.name}</div>
                    <div className="text-gray-600">Price: ${item.price.toFixed(2)} (x{item.quantity})</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center font-bold">
              <span>Total Amount:</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
