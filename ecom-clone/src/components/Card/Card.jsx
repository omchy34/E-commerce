import React from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Card = ({ product, onAddToCart, onAddToWishlist, isInWishlist }) => {
  const cartItems = useSelector((state) => state.Addtocart.cartItems);
  const { isAuthenticated } = useSelector((state) => state.auth); // Use Redux auth state
  const isInCart = cartItems.some((item) => item.ProductId === product._id);

  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      alert("Please login to add items to the cart.");
      navigate("/Login"); // Fixed: capital L to match your route
      return;
    }
    onAddToCart(product);
  };

  const handleAddToWishlist = async () => {
    if (!isAuthenticated) {
      alert("Please login to add items to wishlist.");
      navigate("/Login");
      return;
    }
    onAddToWishlist(product);
  };

  const handleProductClick = (id) => {
    navigate(`/ProductDetails/${id}`);
  };

  // Safe image handling
  const productImage = product.Images && product.Images.length > 0 
    ? product.Images[0] 
    : "/api/placeholder/300/200"; // Fallback image

  return (
    <div className="border rounded-md overflow-hidden shadow-md transition-transform transform hover:scale-105">
      <div 
        className="cursor-pointer"
        onClick={() => handleProductClick(product._id)}
      >
        <img
          src={productImage}
          alt={product.ProductName}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = "/api/placeholder/300/200"; // Fallback on error
          }}
        />
      </div>
      
      <div className="p-4">
        <h3 
          className="font-semibold text-lg cursor-pointer hover:text-blue-600 transition-colors"
          onClick={() => handleProductClick(product._id)}
        >
          {product.ProductName}
        </h3>
        
        <p 
          className="text-gray-700 mb-2 line-clamp-2 cursor-pointer hover:text-gray-900 transition-colors" 
          onClick={() => handleProductClick(product._id)}
        >
          {product.Description}
        </p>
        
        <p className="text-gray-700 font-bold text-lg">
          ₹{product.Price?.toLocaleString() || '0'}
        </p>
        
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleAddToCart}
            className={`flex items-center text-white px-3 py-2 rounded-md transition-colors ${
              isInCart 
                ? "bg-gray-500 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={isInCart}
          >
            <FaShoppingCart className="mr-2" />
            {isInCart ? "Added to Cart" : "Add to Cart"}
          </button>
          
          <button
            onClick={handleAddToWishlist}
            className={`flex items-center p-2 rounded-md transition-colors ${
              isInWishlist
                ? "text-red-600 bg-red-50 hover:bg-red-100"
                : "text-gray-400 hover:text-red-500 hover:bg-gray-50"
            }`}
            title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <FaHeart className={isInWishlist ? "fill-current" : ""} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;