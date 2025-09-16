import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, Addtocart, setCartItems } from "../../features/AddToCart/AddToCart";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Added missing CSS import
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const Cart = () => {
    const [promoCode, setPromoCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [promoMessage, setPromoMessage] = useState("");
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Added loading state
    const [isProcessingPayment, setIsProcessingPayment] = useState(false); // Added payment loading state

    const products = useSelector((state) => state.Addtocart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Load Razorpay script dynamically
    useEffect(() => {
        const loadRazorpayScript = () => {
            return new Promise((resolve) => {
                if (window.Razorpay) {
                    resolve(true);
                    return;
                }
                
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.onload = () => resolve(true);
                script.onerror = () => resolve(false);
                document.head.appendChild(script);
            });
        };

        loadRazorpayScript();
    }, []);

    useEffect(() => {
        const fetchCartData = async () => {
            setIsLoading(true);
            try {
                const res = await axiosInstance.get(`/api/v1/users/fetch-cart`, { withCredentials: true });
                if (res.data && res.data.newItem) {
                    dispatch(setCartItems(res.data.newItem));
                } else {
                    console.error("Invalid cart data format", res.data);
                    toast.error("Failed to load cart data");
                }
            } catch (error) {
                console.error("Error fetching cart data:", error);
                toast.error("Failed to load cart data");
            } finally {
                setIsLoading(false);
            }
        };

        const fetchAddresses = async () => {
            try {
                const res = await axiosInstance.get(`/api/v1/users/FetchAddress`, { withCredentials: true });
                setAddresses(res.data.data || []);
            } catch (error) {
                console.error("Error fetching addresses:", error);
                toast.error("Failed to load addresses");
            }
        };

        fetchCartData();
        fetchAddresses();
    }, [dispatch]);

    const handleRemoveFromCart = async (id) => {
        try {
            await axiosInstance.delete(`/api/v1/users/delete-from-cart/${id}`, { withCredentials: true });
            dispatch(removeFromCart(id));
            toast.success("Item removed from cart");
        } catch (error) {
            console.error("Error removing from cart:", error);
            toast.error("Failed to remove item from cart");
        }
    };

    const updateCartQuantity = async (id, quantity) => {
        const newQuantity = Math.max(1, quantity);
        try {
            const updatedProduct = products.find((product) => product.ProductId === id);
            if (!updatedProduct) {
                console.error("Product not found for ID:", id);
                toast.error("Product not found");
                return;
            }

            const updatedData = {
                ...updatedProduct,
                Quantity: newQuantity,
                SubTotal: updatedProduct.Price * newQuantity,
            };

            // Update API first, then local state
            await axiosInstance.put(`/api/v1/users/update-cart/${id}`, updatedData, { withCredentials: true });
            dispatch(Addtocart(updatedData));
            
        } catch (error) {
            console.error("Error updating quantity:", error);
            toast.error("Failed to update quantity");
        }
    };

    const handlePromoCode = () => {
        if (promoCode === "DISCOUNT10") {
            setDiscount(0.1);
            setPromoMessage("Promo code applied successfully!");
            toast.success("Promo code applied!");
        } else {
            setDiscount(0);
            setPromoMessage("Invalid promo code");
            toast.error("Invalid promo code");
        }
    };

    const handleAddressSelection = (address) => {
        setSelectedAddress(address);
        toast.info("Address selected");
    };

    const subtotal = products.reduce(
        (total, product) => total + (product.Price || 0) * (product.Quantity || 0),
        0
    );
    const total = subtotal - subtotal * discount;

    // Fix 1: In your frontend Cart component, update the orderData calculation
const handlePayment = async () => {
    if (!selectedAddress) {
        toast.error("Please select an address before proceeding.");
        return;
    }

    if (products.length === 0) {
        toast.error("Your cart is empty");
        return;
    }

    setIsProcessingPayment(true);

    try {
        const ProductData = products.map((product) => ({
            ProductId: product.ProductId,
            ProductName: product.ProductName || 'Unknown Product',
            Price: product.Price || 0,
            Quantity: product.Quantity || 1,
            Images: product.Images || [],
        }));

        // FIXED: Convert to paise (multiply by 100) and ensure integer
        const amountInPaise = Math.round(total * 100);

        const orderData = {
            ProductData,
            Address: selectedAddress._id,
            amount: amountInPaise, // Send amount in paise as integer
            subtotal: Math.round(total * 100) / 100, // Keep subtotal for display
            discount: discount,
            promoCode: promoCode || null
        };

        console.log("Sending order data:", orderData);
        console.log("Amount in paise:", amountInPaise);

        // Create order on the server
        const orderRes = await axiosInstance.post(
            "/api/v1/admin/Pay",
            orderData,
            { withCredentials: true }
        );

        console.log("Order response:", orderRes.data);

        if (!orderRes.data || !orderRes.data.orderDetails) {
            throw new Error("Invalid response from server");
        }

        const { orderDetails } = orderRes.data;

        if (!orderDetails.razorpayOrderId || !orderDetails.amount) {
            throw new Error("Missing required order details from server");
        }

        const options = {
            key: 'rzp_test_fFGhlONcEyBess',
            amount: orderDetails.amount, // This should now be an integer in paise
            currency: "INR",
            name: orderDetails.customerName || "Customer",
            description: "Order Payment",
            image: orderDetails.logo || "",
            order_id: orderDetails.razorpayOrderId,
            handler: async (response) => {
                try {
                    const verifyRes = await axiosInstance.post(
                        "/api/v1/admin/VerifyOrder",
                        {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            orderId: orderDetails.orderId
                        },
                        { withCredentials: true }
                    );

                    if (verifyRes.data && verifyRes.data.success) {
                        toast.success("Payment verified successfully!");
                        dispatch(setCartItems([]));
                        navigate("/order-success");
                    } else {
                        throw new Error("Payment verification failed");
                    }
                } catch (verifyError) {
                    console.error("Payment verification error:", verifyError);
                    toast.error("Payment verification failed. Please contact support.");
                }
            },
            prefill: {
                name: selectedAddress.Name || "Customer",
                email: orderDetails.email || "customer@example.com",
                contact: selectedAddress.Phone || "9876543210",
            },
            theme: {
                color: "#F37254",
            },
            modal: {
                ondismiss: () => {
                    setIsProcessingPayment(false);
                    toast.info("Payment cancelled");
                }
            }
        };

        if (!window.Razorpay) {
            throw new Error("Razorpay SDK not loaded. Please refresh the page and try again.");
        }

        const rzp = new window.Razorpay(options);
        
        rzp.on('payment.failed', function (response) {
            console.error("Payment failed:", response.error);
            toast.error(`Payment failed: ${response.error.description}`);
            setIsProcessingPayment(false);
        });

        rzp.open();

    } catch (error) {
        console.error("Error processing payment:", error);
        
        if (error.response) {
            const status = error.response.status;
            const message = error.response.data?.message || error.response.data?.error || "Server error";
            
            if (status === 400) {
                toast.error(`Invalid request: ${message}`);
            } else if (status === 401) {
                toast.error("Please login to continue");
                navigate("/login");
            } else if (status === 500) {
                toast.error("Server error. Please try again later.");
            } else {
                toast.error(`Error: ${message}`);
            }
        } else if (error.request) {
            toast.error("Network error. Please check your connection.");
        } else {
            toast.error(error.message || "Payment failed. Please try again.");
        }
    } finally {
        setIsProcessingPayment(false);
    }
};

    const handleDeleteAddress = async (addressId) => {
        try {
            await axiosInstance.delete(`/api/v1/users/delete-address/${addressId}`, { withCredentials: true });
            setAddresses(addresses.filter(addr => addr._id !== addressId));
            if (selectedAddress && selectedAddress._id === addressId) {
                setSelectedAddress(null);
            }
            toast.success("Address deleted successfully");
        } catch (error) {
            console.error("Error deleting address:", error);
            toast.error("Failed to delete address");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 py-20 flex justify-center items-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading cart...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ToastContainer 
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <h2 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h2>

                {/* Cart Items */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    {products.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-600 text-lg">Your cart is empty</p>
                            <Link to="/products" className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
                                Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        products.map((product) => (
                            <div key={product.ProductId || product._id} className="flex justify-between items-center mb-6 border-b pb-4">
                                <div className="flex items-center">
                                    <img
                                        src={product.Images?.[0] || '/placeholder-image.jpg'} // Fixed: Added null check
                                        alt={product.ProductName || 'Product'}
                                        className="w-16 h-16 object-cover rounded-md mr-4"
                                        onError={(e) => {
                                            e.target.src = '/placeholder-image.jpg'; // Fallback image
                                        }}
                                    />
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{product.ProductName || 'Unknown Product'}</h3>
                                        <p className="text-gray-600">Price: ₹{product.Price || 0}</p>
                                        <p className="text-gray-500 text-sm">Subtotal: ₹{((product.Price || 0) * (product.Quantity || 1)).toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex items-center mr-4">
                                        <button
                                            className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300 disabled:opacity-50"
                                            onClick={() => updateCartQuantity(product.ProductId, product.Quantity - 1)}
                                            disabled={product.Quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-1 bg-gray-100 border-t border-b">{product.Quantity || 1}</span>
                                        <button
                                            className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                                            onClick={() => updateCartQuantity(product.ProductId, product.Quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                                        onClick={() => handleRemoveFromCart(product.ProductId)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Promo Code Section */}
                {products.length > 0 && (
                    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-4">Promo Code</h3>
                        <div className="flex items-center">
                            <input
                                type="text"
                                className="border border-gray-300 p-2 rounded-l-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                placeholder="Enter promo code"
                            />
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition"
                                onClick={handlePromoCode}
                            >
                                Apply
                            </button>
                        </div>
                        {promoMessage && (
                            <p className={`mt-2 ${promoMessage.includes('Invalid') ? 'text-red-600' : 'text-green-600'}`}>
                                {promoMessage}
                            </p>
                        )}
                    </div>
                )}

                {/* Cart Summary */}
                {products.length > 0 && (
                    <div className="mt-8 bg-white p-6 rounded-md shadow-md">
                        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            {discount > 0 && (
                                <div className="flex justify-between text-green-600">
                                    <span>Discount ({(discount * 100).toFixed(0)}%):</span>
                                    <span>-₹{(subtotal * discount).toFixed(2)}</span>
                                </div>
                            )}
                            <hr className="my-2" />
                            <div className="flex justify-between text-xl font-bold">
                                <span>Total:</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Address Selection */}
                {products.length > 0 && (
                    <div className="mt-10">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Select Delivery Address</h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {addresses.map((address) => (
                                <div
                                    key={address._id}
                                    className={`bg-white p-4 w-full rounded-lg shadow-md cursor-pointer hover:shadow-lg transition relative ${
                                        selectedAddress?._id === address._id ? "border-4 border-green-500" : "border border-gray-200"
                                    }`}
                                    onClick={() => handleAddressSelection(address)}
                                >
                                    <h3 className="font-bold">{address.Name}</h3>
                                    <p>{address.street}, {address.city}</p>
                                    <p>{address.state}, {address.country}</p>
                                    <p>Phone: {address.Phone}</p>
                                    <p>Postal Code: {address.postalCode}</p>
                                    
                                    {selectedAddress?._id === address._id && (
                                        <div className="absolute top-2 left-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                                            ✓
                                        </div>
                                    )}

                                    <button 
                                        className="absolute top-2 right-2 text-gray-500 hover:text-red-600 transition"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteAddress(address._id);
                                        }}
                                    >
                                        <MdDelete size={20} />
                                    </button>
                                </div>
                            ))}
                            <div className="bg-white p-4 w-full rounded-lg shadow-md cursor-pointer hover:shadow-lg transition flex justify-center items-center border-2 border-dashed border-gray-300">
                                <Link to='/Add-Address' className="text-blue-500 font-semibold flex flex-col items-center">
                                    <IoAddCircleOutline size={40} />
                                    <span className="mt-2">Add New Address</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Checkout Button */}
                {products.length > 0 && (
                    <div className="mt-8 text-center">
                        <button
                            className={`px-8 py-3 rounded-md text-white font-semibold transition ${
                                isProcessingPayment 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-green-500 hover:bg-green-600'
                            }`}
                            onClick={handlePayment}
                            disabled={isProcessingPayment}
                        >
                            {isProcessingPayment ? 'Processing...' : 'Proceed to Checkout'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;