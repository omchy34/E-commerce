import axios from "axios";
import React, { useEffect, useState } from "react";

const BestDeals = () => {
  const [bestDeals, setBestDeals] = useState([]);

  const [dealName, setDealName] = useState("");

  const addDeal = async (e) => {
    e.preventDefault();

    const res = await axios.post("/api/v1/admin/add-BestDeals", {
      name: dealName,
    });
    console.log(res);
    alert(res.data.message);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/api/v1/admin/getBestDeals");
      setBestDeals(response.data);
    }

    fetchData();
  }, []);
  const deleteDeal = (id) => {
    setBestDeals(bestDeals.filter((deal) => deal.id !== id));
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Best Deals Management</h1>

      {/* Add Best Deal Form */}
      <div className="bg-white p-6 shadow-md rounded-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Best Deal</h2>
        <form onSubmit={addDeal} className="flex space-x-4">
          <input
            type="text"
            value={dealName}
            onChange={(e) => setDealName(e.target.value)}
            placeholder="Enter best deal name"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Add
          </button>
        </form>
      </div>

      {/* Existing Best Deals List */}
      <div className="bg-white p-6 shadow-md rounded-md">
        <h2 className="text-xl font-semibold mb-4">Existing Best Deals</h2>
        <ul className="divide-y divide-gray-200">
          {bestDeals.length === 0 ? (
            <p className="text-gray-500">No best deals available.</p>
          ) : (
            bestDeals.map((deal) => (
              <li
                key={deal.id}
                className="flex justify-between items-center py-2"
              >
                <span className="text-gray-800">{deal.name}</span>
                <button
                  onClick={() => deleteDeal(deal.id)}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default BestDeals;
