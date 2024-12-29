import React from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Card = ({ product, onAddToCart, onAddToWishlist, isInWishlist }) => {
  
  const cartItems = useSelector((state) => state.Addtocart.cartItems);


  const isInCart = cartItems.some((item) => item.ProductId === product._id);

  const navigate = useNavigate();
  const isLoggedIn = !!Cookies.get("AccessToken");

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      alert("Please login to add items to the cart.");
      navigate("/login"); 
      return;
    }
    onAddToCart(product); 
  };

  const HandleID = async (id) => {
    navigate(`/ProductDetails/${id}`)
  }

  return (
    
    <div className="border rounded-md overflow-hidden shadow-md transition-transform transform hover:scale-105" onClick={()=>HandleID(product._id)}>
      <img
        src={product.Images[0]}
        alt={product.ProductName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.ProductName}</h3>
        <p className="text-gray-700 mb-2 line-clamp-2">{product.Description}</p>
        <p className="text-gray-700">₹{product.Price.toLocaleString()}</p>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleAddToCart}
            className={`flex items-center text-white ${
              isInCart ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
            } px-3 py-1 rounded-md`}
            disabled={isInCart}
          >
            <FaShoppingCart className="mr-1" />
            {isInCart ? <span>Added to Cart</span> : <span>Add to Cart</span>}
          </button>
          <button
            onClick={() => onAddToWishlist(product)}
            className={`flex items-center ${
              isInWishlist
                ? "text-red-600 hover:text-red-800"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
