import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import axios from 'axios';

const AddressMain = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axios.get("/api/v1/users/FetchAddress", { withCredentials: true });
        setAddresses(res.data.data || []);
      } catch (error) {
        setError("Failed to fetch addresses. Please try again later.");
        console.error("Error fetching addresses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;

    try {
      await axios.delete(`/api/v1/users/DeleteAddress/${id}`, { withCredentials: true });
      setAddresses((prevAddresses) => prevAddresses.filter((address) => address._id !== id));
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("Failed to delete the address. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="mt-10 px-6 md:px-12 m-5 mb-14">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800 text-center">Select Your Address</h2>

      {error && (
        <div className="mb-6 text-red-600 text-center">
          <p>{error}</p>
        </div>
      )}

      {addresses.length === 0 && !loading ? (
        <div className="text-center text-gray-600">
          <p className="text-lg">No addresses found. Add a new address to get started!</p>
          <Link to="/Add-Address" className="mt-4 inline-block bg-red-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-red-600 transition">
            Add Address
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {addresses.map((address) => (
            <div
              key={address._id}
              className="bg-white p-6 w-full rounded-lg shadow-xl hover:shadow-2xl transition relative border-t-4 border-red-500"
            >
              <h3 className="font-semibold text-xl text-gray-800">{address.Name}</h3>
              <p className="text-gray-700 mt-2">{address.street}, {address.city}</p>
              <p className="text-gray-700">{address.state}, {address.country}</p>
              <p className="text-gray-700 mt-2">Phone: {address.Phone}</p>
              <p className="text-gray-700">Postal Code: {address.postalCode}</p>

              <button
                onClick={() => handleDelete(address._id)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600 transition"
                aria-label="Delete address"
              >
                <MdDelete size={28} />
              </button>
            </div>
          ))}

          <div className="bg-white p-6 w-full rounded-lg shadow-xl hover:shadow-2xl transition flex justify-center items-center border-t-4 border-red-500">
            <Link
              to="/Add-Address"
              className="text-red-500 flex flex-col items-center font-semibold hover:text-red-600 transition"
            >
              <IoAddCircleOutline size={50} />
              <span className="mt-2 text-lg">Add Address</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressMain;
