import React, { useState } from 'react';

const FrontPage = () => {
  const [bannerText, setBannerText] = useState('');
  const [bannerImage, setBannerImage] = useState(null);
  const [banners, setBanners] = useState([]);

  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [categories, setCategories] = useState([]);

  // Handle text input for banner
  const handleTextChange = (e) => {
    setBannerText(e.target.value);
  };

  // Handle image upload for banner
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setBannerImage(file);
  };

  // Handle text input for category name
  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  // Handle image upload for category
  const handleCategoryImageChange = (e) => {
    const file = e.target.files[0];
    setCategoryImage(file);
  };

  // Add banner to the list
  const handleSaveBanner = () => {
    if (bannerText && bannerImage) {
      const newBanner = { text: bannerText, image: bannerImage };
      setBanners([...banners, newBanner]);

      // Reset fields after adding the banner
      setBannerText('');
      setBannerImage(null);
      document.getElementById('bannerImage').value = '';
      alert('Banner and text added successfully!');
    } else {
      alert('Please upload a banner and enter text.');
    }
  };

  // Delete banner from the list
  const handleDeleteBanner = (index) => {
    const updatedBanners = banners.filter((_, i) => i !== index);
    setBanners(updatedBanners);
  };

  // Add category to the list
  const handleSaveCategory = () => {
    if (categoryName && categoryImage) {
      const newCategory = { name: categoryName, image: categoryImage };
      setCategories([...categories, newCategory]);

      // Reset fields after adding the category
      setCategoryName('');
      setCategoryImage(null);
      document.getElementById('categoryImage').value = '';
      alert('Category and image added successfully!');
    } else {
      alert('Please upload a category image and enter a name.');
    }
  };

  // Delete category from the list
  const handleDeleteCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center text-purple-800 mb-6">Front-Page</h1>

      {/* Flex container to hold both sections side by side */}
      <div className="flex justify-between gap-8">
        {/* Banner Section */}
        <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-purple-800 mb-4">Add Banners</h2>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Banner Text:</label>
            <input
              type="text"
              value={bannerText}
              onChange={handleTextChange}
              placeholder="Enter banner text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Upload Banner Image:</label>
            <input
              type="file"
              id="bannerImage"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <button
            onClick={handleSaveBanner}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Add Banner
          </button>

          {/* Display Added Banners */}
          <h2 className="text-2xl font-bold text-center text-purple-800 mt-6 mb-4">Added Banners</h2>
          {banners.length === 0 ? (
            <p className="text-gray-600 text-center">No banners added yet.</p>
          ) : (
            <ul>
              {banners.map((banner, index) => (
                <li key={index} className="mb-4">
                  <div className="mb-2 text-lg font-semibold">{banner.text}</div>
                  <img
                    src={URL.createObjectURL(banner.image)}
                    alt={`Banner ${index + 1}`}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <button
                    onClick={() => handleDeleteBanner(index)}
                    className="mt-2 bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Delete Banner
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Special Category Section */}
        <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-purple-800 mb-4">Add Special Categories</h2>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Category Name:</label>
            <input
              type="text"
              value={categoryName}
              onChange={handleCategoryNameChange}
              placeholder="Enter category name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Upload Category Image:</label>
            <input
              type="file"
              id="categoryImage"
              onChange={handleCategoryImageChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <button
            onClick={handleSaveCategory}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Add Category
          </button>

          {/* Display Added Special Categories */}
          <h2 className="text-2xl font-bold text-center text-purple-800 mt-6 mb-4">Added Special Categories</h2>
          {categories.length === 0 ? (
            <p className="text-gray-600 text-center">No categories added yet.</p>
          ) : (
            <ul>
              {categories.map((category, index) => (
                <li key={index} className="mb-4">
                  <div className="mb-2 text-lg font-semibold">{category.name}</div>
                  <img
                    src={URL.createObjectURL(category.image)}
                    alt={`Category ${index + 1}`}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <button
                    onClick={() => handleDeleteCategory(index)}
                    className="mt-2 bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Delete Category
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
