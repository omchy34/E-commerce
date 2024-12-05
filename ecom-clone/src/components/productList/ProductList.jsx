import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Addtocart } from "../../features/AddToCart/AddToCart.js";
import { Addtowishlist, Removefromwishlist } from "../../features/WishList/WishList.js";

const ProductListing = () => {
  const [productsData, setProductsData] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);
  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.Wishlist.Wishlist || []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/v1/admin/FetchProduct");
        
        setProductsData(response.data.allProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = productsData.filter(
    (product) =>
      product.Price >= priceRange[0] && product.Price <= priceRange[1]
  );

  const handleAddToCart = (product) => {
    dispatch(Addtocart(product));
    alert(`${product.ProductName} has been added to your cart.`);
  };

  const handleAddToWishlist = (product) => {
    const isInWishlist = wishlist.some((item) => item._id === product._id);
    if (isInWishlist) {
      dispatch(Removefromwishlist(product._id));
    } else {
      dispatch(Addtowishlist(product));
    }
    alert(
      `${product.ProductName} has been ${
        isInWishlist ? "removed from" : "added to"
      } your wishlist.`
    );
  };

  return (
    <div className="flex flex-col md:flex-row pt-20">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      <div
        className={`md:w-1/6 bg-gray-100 p-4 rounded-md shadow-lg ${
          showFilters ? "block" : "hidden md:block"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4">Filter</h2>
        <div className="mb-4">
          <h3 className="font-medium">Price Range</h3>
          <input
            type="range"
            min="0"
            max="100000"
            step="1000"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            className="w-full"
          />
          <input
            type="range"
            min="0"
            max="100000"
            step="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            className="w-full mt-2"
          />
          <p className="mt-2">
            Price: ₹{priceRange[0].toLocaleString()} - ₹
            {priceRange[1].toLocaleString()}
          </p>
        </div>
      </div>

      <div className="md:w-3/4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <Card
            key={product._id}
            product={product}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
            isInWishlist={wishlist.some((item) => item._id === product._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
