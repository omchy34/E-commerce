import React, { useState, useEffect } from "react";
import axios from "axios";


const FrontPage = () => {
  const [BannerText, setBannerText] = useState('');
  const [BannerImage, setBannerImage] = useState(null);
  const [ExistingBanner, setExistingBanner] = useState([])

  const [CategoryText, setCategoryText] = useState('');
  const [CategoryImage, setCategoryImage] = useState(null);
  const [ExistingCategory, setExistingCategory] = useState([])

  const handleSaveBanner = async () => {
    try {
      const formData = new FormData();
      formData.append("name", BannerText);
      formData.append("images", BannerImage); 

      const res = await axios.post("https://e-commerceserver-uu0f.onrender.com/api/v1/admin/addBanner", formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });
      console.log(res);
    } catch (error) {
      console.error("Error adding banner:", error);
    }
  };

  const handleSaveCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("name", CategoryText);
      formData.append("images", CategoryImage); 

      const res = await axios.post("https://e-commerceserver-uu0f.onrender.com/api/v1/admin/addSepicalCategory", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  useEffect(() => {
    async function FetchSep() {
      const res = await axios.get("https://e-commerceserver-uu0f.onrender.com/api/v1/admin/GetAllSepicalCategory");
      console.log(res);
      if (res) {
        setExistingCategory(res.data.allSepicalCategory)
      }
    }

    async function FetchCat() {
      const res = await axios.get("https://e-commerceserver-uu0f.onrender.com/api/v1/admin/GetAllBanner");
      console.log(res);
      if (res) {
        setExistingBanner(res.data.allBanners)
      }
    }

    FetchSep()

    FetchCat()
  }, [])


  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center text-purple-800 mb-6">Front Page</h1>
      <div className="flex justify-between gap-8">
        {/* Banner Section */}
        <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-purple-800 mb-4">Add Banners</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Banner Text:</label>
            <input
              type="text"
              value={BannerText}
              onChange={(e) => { setBannerText(e.target.value) }}
              placeholder="Enter banner text"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Upload Banner Image:</label>
            <input
              type="file"
              id="bannerImage"
              onChange={(e) => { setBannerImage(e.target.files[0]) }}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <button
            onClick={handleSaveBanner}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg"
          >
            Add Banner
          </button>
          <h2 className="text-2xl font-bold text-center text-purple-800 mt-6 mb-4">Added Banners</h2>
          {ExistingBanner.length === 0 ? (
            <p className="text-gray-600 text-center">No banners added yet.</p>
          ) : (
            <ul>
              {ExistingBanner.map((banner, index) => (
                <li key={banner._id} className="mb-4">
                  <div className="mb-2 text-lg font-semibold">{banner.name}</div>
                  <img
                    src={banner.images}
                    alt={`Banner ${index + 1}`}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <button
                    // onClick={() => handleDeleteBanner(index, banner._id)}
                    className="mt-2 bg-red-600 text-white py-1 px-3 rounded-lg"
                  >
                    Delete Banner
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Category Section */}
        <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-purple-800 mb-4">Add Special Categories</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Category Name:</label>
            <input
              type="text"
              value={CategoryText}
              onChange={(e) => { setCategoryText(e.target.value) }}
              placeholder="Enter category name"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Upload Category Image:</label>
            <input
              type="file"
              id="categoryImage"
              onChange={(e) => { setCategoryImage(e.target.files[0]) }}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <button
            onClick={handleSaveCategory}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg"
          >
            Add Category
          </button>
          <h2 className="text-2xl font-bold text-center text-purple-800 mt-6 mb-4">Added Special Categories</h2>
          {ExistingCategory.length === 0 ? (
            <p className="text-gray-600 text-center">No categories added yet.</p>
          ) : (
            <ul>
              {ExistingCategory.map((category, index) => (
                <li key={category._id} className="mb-4">
                  <div className="mb-2 text-lg font-semibold">{category.name}</div>
                  <img
                    src={category.images}
                    alt={`broken`}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <button
                    // onClick={() => handleDeleteCategory(index, category.id)}
                    className="mt-2 bg-red-600 text-white py-1 px-3 rounded-lg"
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
