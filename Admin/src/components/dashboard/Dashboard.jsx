import React from "react";

const Dashboard = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
        <div>Chart Placeholder</div>
      </div>
      <div className="bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div>Order List Placeholder</div>
      </div>
      <div className="bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Top Products</h2>
        <div>Product List Placeholder</div>
      </div>
      <div className="bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Customer Insights</h2>
        <div>Customer Data Placeholder</div>
      </div>
    </div>
  );
};

export default Dashboard;
