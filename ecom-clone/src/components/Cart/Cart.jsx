import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCartQuantity,
  removeFromCart,
} from "../../features/AddToCart/AddToCart";
import axios from "axios";
import { Link } from "react-router-dom";

const Cart = () => {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const products = useSelector((state) => state.Addtocart.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    products.forEach(async (product) => {
      try {
        const res = await axios.post(
          "/api/v1/admin/addToCart",
          {
            ProductId: product._id,
            quantity: product.Quantity,
          },
          { withCredentials: true }
        );
        console.log("Cart data synced:", res.data);
      } catch (error) {
        console.error("Error syncing cart data:", error);
      }
    });
    if (products.length > 0) {
      // CartData();
    }
  }, [products]); // Use products as the dependency

  const handleQuantityChange = (id, change) => {
    dispatch(updateCartQuantity({ id, change }));
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleApplyPromoCode = () => {
    if (promoCode === "DISCOUNT10") {
      setDiscount(0.1); // 10% discount
    } else {
      alert("Invalid promo code");
    }
  };

  const subtotal = products.reduce(
    (total, product) => total + product.Price * product.Quantity,
    0
  );

  const total = subtotal - subtotal * discount;

  return (
    <div className="min-h-screen bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="bg-white shadow-md rounded-lg p-6">
              {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-96 bg-gradient-to-b from-white to-gray-100 p-6">
                  <img
                    src="https://img.icons8.com/clouds/500/shopping-cart.png"
                    alt="Empty Cart"
                    className="w-44 h-60 mb-6"
                  />
                  <h2 className="text-2xl font-extrabold text-gray-800 mb-2">
                    Your Cart is Empty!
                  </h2>
                  <p className="text-lg text-gray-500 text-center mb-6">
                    Oops! Looks like you haven't added anything yet.
                    <br />
                    Start exploring our amazing products!
                  </p>
                  <Link
                    to="/"
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
                  >
                    Shop Now
                  </Link>
                </div>
              ) : (
                products.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center space-x-6 mb-6"
                  >
                    <img
                      src={product.Images[0]}
                      alt={product.ProductName}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold">
                        {product.ProductName}
                      </h3>
                      <p className="text-gray-500">
                        Quantity: {product.Quantity}
                      </p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => handleQuantityChange(product._id, -1)}
                          className="bg-gray-200 text-gray-600 px-2 py-1 rounded-md hover:bg-gray-300 transition duration-300"
                        >
                          -
                        </button>
                        <span className="mx-2">{product.Quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(product._id, 1)}
                          className="bg-gray-200 text-gray-600 px-2 py-1 rounded-md hover:bg-gray-300 transition duration-300"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-gray-700 mt-2">
                        Price per item:{" "}
                        <span className="font-semibold">
                          ₹{product.Price.toFixed(2)}
                        </span>
                      </p>
                      <p className="text-gray-700 mt-2">
                        Total Price:{" "}
                        <span className="font-semibold">
                          ₹{(product.Price * product.Quantity).toFixed(2)}
                        </span>
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={() => handleRemoveProduct(product._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>- ₹{(subtotal * discount || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="border rounded-md p-2 w-full"
                />
                <button
                  onClick={handleApplyPromoCode}
                  className="bg-blue-600 text-white w-full py-2 rounded-md mt-2 hover:bg-blue-700 transition duration-300"
                >
                  Apply
                </button>
              </div>

              <div className="mt-4">
                <h4 className="font-bold mb-2">Payment Method</h4>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="border rounded-md p-2 w-full"
                >
                  <option value="cod">Cash on Delivery</option>
                  <option value="online">Online Payment</option>
                </select>
              </div>

              <button className="bg-blue-600 text-white w-full py-2 rounded-md mt-4 hover:bg-blue-700 transition duration-300">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
