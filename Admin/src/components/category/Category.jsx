import axios from "axios";
import React, { useEffect, useState } from "react";

const Category = () => {
 
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  // Add category to temp data
  const addCategory = async (e) => {
    e.preventDefault();
    const res = await axios.post("https://e-commerceserver-uu0f.onrender.com/api/v1/admin/add-category", ({name:categoryName}))
    console.log(res);
  };

  useEffect(()=>{
    async function fetchCategory(){
      const res = await axios.get("https://e-commerceserver-uu0f.onrender.com/api/v1/admin/GetAllCategory") ;
      console.log(res);
      setCategories(res.data);
     
    }

    fetchCategory() ;
  } , [])

  // Delete category from temp data
  const deleteCategory = (id) => {
    setCategories(categories.filter((category) => category._id !== id));
  };

  return (
    <div className="container mx-auto p-8">
      
      {/* Add Category Form */}
      <div className="bg-white p-6 shadow-md rounded-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
        <form onSubmit={addCategory} className="flex space-x-4">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
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

      {/* Existing Categories List */}
      <div className="bg-white p-6 shadow-md rounded-md">
        <h2 className="text-xl font-semibold mb-4">Existing Categories</h2>
        <ul className="divide-y divide-gray-200">
          {categories.length === 0 ? (
            <p className="text-gray-500">No categories available.</p>
          ) : (
            categories.map((category) => (
              <li
                key={category._id}
                className="flex justify-between items-center py-2"
              >
                <span className="text-gray-800">{category.name}</span>
                <button
                  onClick={() => deleteCategory(category._id)}
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

export default Category;
