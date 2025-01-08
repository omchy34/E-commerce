import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [categories, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function FetchSepCat() {
      const res = await axios.get("http://localhost:5673/api/v1/admin/GetAllSpecialCategory");
      setCategory(res.data.allSepicalCategory);
    }
    FetchSepCat();
  }, []);

  function handleCategoryClick(categoryId, name) {
    if (name.toLowerCase() === "fashion") {
      navigate(`/fashion/${categoryId}/${name}`);
    } else if (name.toLowerCase() === "mobile") {
      navigate(`/mobile/${categoryId}/${name}`);
    } else {
      navigate("/ProductList");
    }
  }

  return (
    <div className="bg-gray-100 pt-20">
      <div className="flex lg:justify-around overflow-x-scroll scrollbar-hide space-x-4 px-2">
        {categories.map((category) => (
          <div className="text-center min-w-[60px]" key={category._id}>
            <img
              onClick={() => handleCategoryClick(category._id, category.name)}
              src={category.images}
              alt={category.name}
              className="w-12 h-12 mx-auto cursor-pointer"
            />
            <p className="text-xs mt-1">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
