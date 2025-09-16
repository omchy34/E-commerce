import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FaShoppingCart } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance.js";
const ProductDetail = ({ onAddToCart }) => {

  const cartItems = useSelector((state) => state.Addtocart.cartItems);


  const isInCart = cartItems.some((item) => item.ProductId === product._id);

  const { id } = useParams();
  const [reviews, setReviews] = useState([
    {
      name: "John Doe",
      rating: 5,
      comment: "Amazing sound quality and very comfortable to wear!",
    },
    {
      name: "Jane Smith",
      rating: 4,
      comment: "Battery life is great, but the price is a bit high.",
    },
  ]);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    async function fetchProductDetail() {
      try {
        const res = await axiosInstance.get(`/api/v1/admin/ProductDetails/${id}`);
        console.log(res);

        setProduct(res.data.product);
        setSelectedImage(res.data.product.Images[0]);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }

    fetchProductDetail();
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 mt-20">
        <p>Loading product details...</p>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      alert("Please login to add items to the cart.");
      navigate("/login");
      return;
    }
    onAddToCart(product);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div>
          <div className="w-full h-[400px] mb-4">
            <img
              src={selectedImage}
              alt="Selected Product"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
          <div className="flex space-x-4">
            {product.Images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`border-2 ${selectedImage === image ? "border-blue-500" : "border-gray-300"
                  } rounded-lg`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </button>
            ))}
          </div>
        </div>


        <div>
          <h1 className="text-3xl font-bold mb-4">{product.ProductName}</h1>
          <p className="text-xl text-gray-700 mb-4">{product.Price}</p>
          <button
            onClick={handleAddToCart}
            className={`flex items-center text-white ${isInCart ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
              } px-3 py-1 rounded-md`}
            disabled={isInCart}
          >
            <FaShoppingCart className="mr-1" />
            {isInCart ? <span>Added to Cart</span> : <span>Add to Cart</span>}
          </button>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Product Details</h2>
          <ul className="list-disc list-inside space-y-2">
            {product.About.map((detail, index) => (
              <li key={index} className="text-gray-700">
                {detail}
              </li>
            ))}
          </ul>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Description</h2>
          <p className="text-gray-700">{product.Description}</p>
        </div>
      </div>


      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
        {reviews.map((review, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 mb-4 shadow-md bg-gray-50"
          >
            <h3 className="text-lg font-bold">{review.name}</h3>
            <p className="text-yellow-500">{'★'.repeat(review.rating)}</p>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
