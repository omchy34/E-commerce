import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaTrash, FaEye } from 'react-icons/fa'; // Importing icons

const CustomerPage = () => {
  // State to store customer data
  const [customers, setCustomers] = useState([]);


  useEffect(() => {
    async function FetchUser() {
      const response = await axios.get("/api/v1/users/AllUsers")
      setCustomers(response.data.users);
    }
    FetchUser()
  }, []);

  // Function to handle customer deletion
  const handleDeleteCustomer = async(id) => {
    const res = await axios.delete(`/api/v1/users/DeleteUser/${id}`)
    console.log(res);
    if(res.data){

      const updatedCustomers = customers.filter((customer) => customer._id !== id);
      setCustomers(updatedCustomers);
    }
  };

  // Function to handle view details (you can navigate to a detailed view page here)
  const handleViewCustomer = (customer) => {
    alert(`Viewing details for: ${customer.FullName}`);
    // Here you can redirect to a detailed customer view page using a router (e.g., useHistory)
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold text-center text-purple-800 mb-6">Customer List</h1>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-10xl mx-auto overflow-x-auto">
        {/* Customer Table */}
        <table className="min-w-full bg-white border text-center">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Notification Sent</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No customers found.
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer._id}>
                  <td className="py-2 px-4 border-b">{customer._id}</td>
                  <td className="py-2 px-4 border-b">{customer.FullName}</td>
                  <td className="py-2 px-4 border-b">{customer.Email}</td>
                  <td className="py-2 px-4 border-b">{customer.Phone}</td>
                  <td className={`py-2 px-4 border-b ${customer.notificationSent ? 'text-green-500' : 'text-red-500'}`}>
                    {customer.notificationSent ? 'Yes' : 'No'}
                  </td>
                  <td className="py-2 px-4 border-b flex justify-center space-x-2">
                    {/* View Button */}
                    <button
                      onClick={() => handleViewCustomer(customer)}
                      className="bg-blue-500 text-white py-1 px-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center space-x-1"
                    >
                      <FaEye /> <span>View</span>
                    </button>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteCustomer(customer._id)}
                      className="bg-red-600 text-white py-1 px-2 rounded-lg hover:bg-red-700 transition duration-300 flex items-center space-x-1"
                    >
                      <FaTrash /> <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerPage;
