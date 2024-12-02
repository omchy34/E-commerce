import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setproducts] = useState([])

  useEffect(() => {
    async function FetchProduct() {
      const res = await axios.get("/api/v1/admin/FetchProduct") ;
      console.log(res);
      setproducts(res.data.allProducts) ;
    }
    FetchProduct()
  }, [])

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Link to="/AddProduct" className="bg-purple-600 text-white rounded-lg py-2 px-4 shadow-md hover:bg-purple-700">
          + Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        
        <select className="border border-gray-300 rounded-lg p-2 col-span-1">
          <option>All Products</option>
          <option>Jackets</option>
          {/* Add more options */}
        </select>
        <select className="border border-gray-300 rounded-lg p-2 col-span-1">
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <select className="border border-gray-300 rounded-lg p-2 col-span-1">
          <option>Price: $50 - $100</option>
          {/* Add more pricing filters */}
        </select>
      </div>

      {/* Product Table */}
      <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-gray-200 text-gray-600">
          <tr>
            <th className="py-2 px-4 text-left">Image</th>
            <th className="py-2 px-4 text-left">Product Name</th>
            <th className="py-2 px-4 text-left">Category</th>
            <th className="py-2 px-4 text-left">Price</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b hover:bg-gray-100">
              <td className="py-2 px-4">
                <img src={product.Images[0]} alt={product.ProductName} className="w-16 h-16 object-cover" />
              </td>
              <td className="py-2 px-4">{product.ProductName}</td>
              <td className="py-2 px-4">{product.Category}</td> {/* Category column */}
              <td className="py-2 px-4">{product.Price}</td>
              <td className="py-2 px-4">
                {product.Stock}
              </td>
              <td className="py-2 px-4 text-center">
                <Link to="/ProductDetails" className="text-blue-500 hover:underline">Details</Link>
                <button className="text-red-500 hover:underline ml-4">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
