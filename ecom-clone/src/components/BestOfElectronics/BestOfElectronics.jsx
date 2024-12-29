import React, { useState, useEffect } from "react";
import axios from "axios";

const BestDeals = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/v1/admin/FetchProduct");
        const allProducts = response.data.allProducts;

        const groupedCategories = groupByCategory(allProducts);
        setCategories(groupedCategories);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchCategories();
  }, []);

  const groupByCategory = (products) => {
    const categories = {};

    products.forEach((product) => {
      if (!categories[product.Category]) {
        categories[product.Category] = [];
      }
      categories[product.Category].push(product);
    });

    return categories;
  };

  return (
    <div className="p-4">
      {Object.keys(categories).map((category, index) => {
        const limitedProducts = categories[category].slice(0, 5);

        return (
          <div key={index} className="mb-8">
            <h3 className="text-xl font-bold mb-4">50% off on {category}</h3>

            <div className="scroll-container flex space-x-4 overflow-x-auto">
              {limitedProducts.map((product, index) => (
                <div key={index} className="min-w-[200px] bg-white border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <img src={product.Images[0]} alt={product.ProductName} className="w-full h-40 object-cover rounded-t-lg" />
                  <div className="p-2 text-center">
                    <h4 className="font-semibold text-sm">{product.ProductName}</h4>
                    <p className="text-green-500 font-bold text-sm">₹{product.Price}</p>
                    {product.BestDeals && product.BestDeals.length > 0 && (
                      <p className="text-red-500 text-sm">{product.BestDeals[0]}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BestDeals;
