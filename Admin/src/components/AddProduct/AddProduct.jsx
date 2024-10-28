import axios from 'axios';
import React, { useState, useEffect } from 'react';

const AddProduct = () => {
  const [bestDealsOptions, setBestDealsOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState({
    ProductName: '',
    Price: '',
    Category: '',
    BestDeals: '',
    Stock: 'In Stock',
    Brand: '',
    Description: '',
    About: [],
    images: [],
  });
  const [aboutItem, setAboutItem] = useState('');

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get("/api/v1/admin/GetAllCategory");
        setCategories(res.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    async function fetchBestDeals() {
      try {
        const res = await axios.get("/api/v1/admin/getBestDeals");
        setBestDealsOptions(res.data);
      } catch (error) {
        console.error('Error fetching best deals:', error);
      }
    }

    fetchCategories();
    fetchBestDeals();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setProductData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...files],
    }));
  };

  const handleAddAboutItem = () => {
    if (aboutItem.trim() !== '') {
      setProductData((prevData) => ({
        ...prevData,
        About: [...prevData.About, aboutItem.trim()],
      }));
      setAboutItem(''); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('ProductName', productData.ProductName);
    formData.append('Price', productData.Price);
    formData.append('Category', productData.Category);
    formData.append('BestDeals', productData.BestDeals);
    formData.append('Stock', productData.Stock);
    formData.append('Brand', productData.Brand);
    formData.append('Description', productData.Description);
    
    // Append the About items as a stringified array
    formData.append('About', JSON.stringify(productData.About));
    
    productData.images.forEach((image) => {
      formData.append('images', image);
    });

    console.log("Product Data:", productData);

    try {
      const res = await axios.post('/api/v1/admin/add-product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Product added successfully:', res.data);
      // Reset form after successful submission if needed
      setProductData({
        ProductName: '',
        Price: '',
        Category: '',
        BestDeals: '',
        Stock: 'In Stock',
        Brand: '',
        Description: '',
        About: [],
        images: [],
      });
    } catch (error) {
      console.error('Error adding product:', error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Add New Product</h1>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-6">
          {/* Product Name */}
          <div className="flex-1 min-w-[300px] mb-4">
            <label className="block text-gray-700 font-semibold">Product Name</label>
            <input
              type="text"
              name="ProductName"
              value={productData.ProductName}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Category */}
          <div className="flex-1 min-w-[300px] mb-4">
            <label className="block text-gray-700 font-semibold">Category</label>
            <select
              name="Category"
              value={productData.Category}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
              required
            >
              <option value="">Select Category</option>
              {categories.map((Category) => (
                <option key={Category._id} value={Category.name}>
                  {Category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Best Deals */}
          <div className="flex-1 min-w-[300px] mb-4">
            <label className="block text-gray-700 font-semibold">Best Deals</label>
            <select
              name="BestDeals"
              value={productData.BestDeals}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
              required
            >
              <option value="">Select Best Deal</option>
              {bestDealsOptions.map((deal) => (
                <option key={deal._id} value={deal.name}>
                  {deal.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="flex-1 min-w-[300px] mb-4">
            <label className="block text-gray-700 font-semibold">Price ($)</label>
            <input
              type="number"
              name="Price"
              value={productData.Price}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
              placeholder="Enter product price"
              required
            />
          </div>

          {/* Stock */}
          <div className="flex-1 min-w-[300px] mb-4">
            <label className="block text-gray-700 font-semibold">Stock</label>
            <select
              name="Stock"
              value={productData.Stock}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
            >
              <option value="Out Of Stock">Out Of Stock</option>
              <option value="In Stock">In Stock</option>
            </select>
          </div>

          {/* Brand */}
          <div className="flex-1 min-w-[300px] mb-4">
            <label className="block text-gray-700 font-semibold">Brand</label>
            <input
              type="text"
              name="Brand"
              value={productData.Brand}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
              placeholder="Enter product brand"
              required
            />
          </div>

          {/* Description */}
          <div className="flex-1 min-w-[300px] mb-4">
            <label className="block text-gray-700 font-semibold">Product Description</label>
            <textarea
              name="Description"
              value={productData.Description}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
              placeholder="Enter product description"
              rows="3"
              required
            />
          </div>

          {/* About (Add items to the list) */}
          <div className="flex-1 min-w-[300px] mb-4">
            <label className="block text-gray-700 font-semibold">About the Product</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={aboutItem}
                onChange={(e) => setAboutItem(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
                placeholder="Add a feature or detail"
              />
              <button
                type="button"
                onClick={handleAddAboutItem}
                className="bg-purple-600 text-white font-semibold rounded-lg py-2 px-4 hover:bg-purple-700 transition duration-200"
              >
                Add
              </button>
            </div>
            {productData.About.length > 0 && (
              <ul className="list-disc list-inside mt-2 text-gray-600">
                {productData.About.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Upload Images */}
          <div className="flex-1 min-w-[300px] mb-4">
            <label className="block text-gray-700 font-semibold">Upload Images</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200"
            />
            {/* Display selected images */}
            {productData.images.length > 0 && (
              <div className="mt-2 grid grid-cols-2 gap-2">
                {productData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Uploaded preview ${index + 1}`}
                      className="h-32 w-full object-cover rounded-lg border"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="w-full mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-purple-600 text-white font-semibold rounded-lg py-2 transition duration-200 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'
              }`}
            >
              {isLoading ? 'Adding Product...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
