import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, Addtocart, setCartItems } from "../../features/AddToCart/AddToCart";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
    const [promoCode, setPromoCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [promoMessage, setPromoMessage] = useState("");

    const products = useSelector((state) => state.Addtocart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const res = await axios.get("/api/v1/users/fetch-cart", { withCredentials: true });
                console.log(res.data);

                if (res.data && res.data.newItem) {
                    const cartData = res.data.newItem;
                    dispatch(setCartItems(cartData));
                } else {
                    console.error("Invalid cart data format", res.data);
                }
            } catch (error) {
                console.error("Error fetching cart data:", error);
            }
        };

        fetchCartData();
    }, [dispatch]);

    const handleRemoveFromCart = async (id) => {
        try {
            await axios.delete(`/api/v1/users/delete-from-cart/${id}`, { withCredentials: true });
            dispatch(removeFromCart(id));
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };

    const updateCartQuantity = async (id, quantity) => {
        const newQuantity = Math.max(1, quantity);

        try {
            const updatedProduct = products.find((product) => product.ProductId === id);
            if (!updatedProduct) {
                console.error("Product not found for ID:", id);
                return;
            }

            const updatedData = {
                ProductId: updatedProduct.ProductId,
                ProductName: updatedProduct.ProductName,
                Price: updatedProduct.Price,
                Quantity: newQuantity,
                SubTotal: updatedProduct.Price * newQuantity,
                Brand: updatedProduct.Brand,
                Images: updatedProduct.Images,
            };

            dispatch(Addtocart(updatedData));

            const res = await axios.put(
                `/api/v1/users/update-cart/${id}`,
                updatedData,
                { withCredentials: true }
            );

            if (res.data) {
                console.log("Backend updated the cart successfully.");
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const handlePromoCode = () => {
        if (promoCode === "DISCOUNT10") {
            setDiscount(0.1);
            setPromoMessage("Promo code applied successfully!");
        } else {
            setDiscount(0);
            setPromoMessage("Invalid promo code");
        }
    };

    // Recalculate subtotal and total with additional checks
    const subtotal = products.reduce(
        (total, product) => {
            if (product && product.Price && product.Quantity) {
                return total + product.Price * product.Quantity;
            }
            return total; // Skip undefined or incomplete products
        },
        0
    );
    const total = subtotal - subtotal * discount;

    return (
        <div className="min-h-screen bg-gray-100 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h2>

                {/* Cart Items List */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    {products.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        products.map((product) => (
                            <div key={product.ProductId || product._id} className="flex justify-between items-center mb-6">
                                <div className="flex items-center">
                                    <img
                                        src={product.Images[0]} 
                                        alt={product.ProductName}
                                        className="w-16 h-16 object-cover rounded-md mr-4"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{product.ProductName}</h3>
                                        <p className="text-gray-600">Price: ₹{product.Price}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        <button
                                            className="px-2 py-1 bg-gray-200"
                                            onClick={() => updateCartQuantity(product.ProductId, product.Quantity - 1)}
                                            disabled={product.Quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="mx-2">{product.Quantity}</span>
                                        <button
                                            className="px-2 py-1 bg-gray-200"
                                            onClick={() => updateCartQuantity(product.ProductId, product.Quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-md ml-4"
                                        onClick={() => handleRemoveFromCart(product.ProductId)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Promo Code */}
                <div className="mt-8">
                    <input
                        type="text"
                        className="border border-gray-300 p-2 rounded-md w-64"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter promo code"
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
                        onClick={handlePromoCode}
                    >
                        Apply
                    </button>
                    <p className="text-green-600 mt-2">{promoMessage}</p>
                </div>

                {/* Cart Summary */}
                <div className="flex justify-between items-center mt-8 bg-white p-6 rounded-md shadow-md">
                    <div>
                        <p className="text-lg font-semibold">Subtotal: ₹{subtotal.toFixed(2)}</p>
                        <p className="text-lg font-semibold">Discount: -₹{(subtotal * discount).toFixed(2)}</p>
                    </div>
                    <div>
                        <p className="text-xl font-bold">Total: ₹{total.toFixed(2)}</p>
                        <button
                            className="bg-green-500 text-white px-6 py-3 mt-4 rounded-md"
                            onClick={() => navigate("/checkout")}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
