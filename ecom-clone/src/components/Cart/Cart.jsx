import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, Addtocart, setCartItems } from "../../features/AddToCart/AddToCart";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"

const Cart = () => {
    const [promoCode, setPromoCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [promoMessage, setPromoMessage] = useState("");
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const products = useSelector((state) => state.Addtocart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

  
    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const res = await axios.get("http://localhost:5673/api/v1/users/fetch-cart", { withCredentials: true });
                if (res.data && res.data.newItem) {
                    dispatch(setCartItems(res.data.newItem));
                } else {
                    console.error("Invalid cart data format", res.data);
                }
            } catch (error) {
                console.error("Error fetching cart data:", error);
            }
        };

        fetchCartData();

        const fetchAddresses = async () => {
            try {
                const res = await axios.get("http://localhost:5673/api/v1/users/FetchAddress", { withCredentials: true });
                console.log(res);

                setAddresses(res.data.data || []);
            } catch (error) {
                console.error("Error fetching addresses:", error);
            }
        };

        fetchAddresses();
    }, [dispatch]);


    const handleRemoveFromCart = async (id) => {
        try {
            await axios.delete(`http://localhost:5673/api/v1/users/delete-from-cart/${id}`, { withCredentials: true });
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
                ...updatedProduct,
                Quantity: newQuantity,
                SubTotal: updatedProduct.Price * newQuantity,
            };

            dispatch(Addtocart(updatedData));

            await axios.put(`http://localhost:5673/api/v1/users/update-cart/${id}`, updatedData, { withCredentials: true });
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

    const handleAddressSelection = (address) => {
        setSelectedAddress(address);
    };

    
    const subtotal = products.reduce(
        (total, product) => total + (product.Price || 0) * (product.Quantity || 0),
        0
    );
    const total = subtotal - subtotal * discount;
   
    const handlePayment = async () => {
        if (!selectedAddress) {
            alert("Please select an address before proceeding.");
            return;
        }
        const subtotal = products.reduce(
            (total, product) => total + (product.Price || 0) * (product.Quantity || 0),
            0
        );
        const Total = subtotal - subtotal * discount;

        const ProductData = products.map((product) => ({
            ProductId: product.ProductId,
            ProductName: product.ProductName,
            Price : product.Price ,
            Quantity: product.Quantity,
            Images: product.Images,
        }));
        
    
        try {
            // Create order on the server
            const orderRes = await axios.post(
                "http://localhost:5673/api/v1/admin/Pay",
                { ProductData, Address: selectedAddress._id , subtotal:Total},
                { withCredentials: true }
            );
            
            console.log(orderRes);
            
            
            const { orderDetails } = orderRes.data;
    
            // Configure Razorpay options
            const FullName = Cookies.get("FullName")
            const options = {
                key:'rzp_test_pg5rgxA4LGmbqY',
                amount: orderDetails.subtotal * 100,
                currency: "INR",
                name: FullName,
                description: "Order Payment",
                image: "https://your-logo-url.com/logo.png",
                order_id: orderDetails.razorpayOrderId, // Pass the order ID from Razorpay
                handler: async (response) => {
                    // Verify payment on the server
                    const verifyRes = await axios.post(
                        "http://localhost:5673/api/v1/admin/VerifyOrder",
                        {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        },
                        { withCredentials: true }
                    );
    
                    if (verifyRes.data) {
                        toast.success("Payment verified successfully!");
                        navigate("/order-success");
                    }
                },
                prefill: {
                    name: "Customer Name",
                    email: "customer@example.com",
                    contact: "9876543210",
                },
                theme: {
                    color: "#F37254",
                },
            };
    
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Error processing payment:", error);
            toast.error("Payment failed. Please try again.");
        }
    };
    

    return (
        <div className="min-h-screen bg-gray-100 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ToastContainer/>
                <h2 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h2>

                {/* Cart Items */}
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
                    </div>
                </div>

                {/* Address Selection */}
                <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Select Address</h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {addresses.map((address) => (
                            <div
                                key={address._id}
                                className={`bg-white p-4 w-full rounded-lg shadow-md cursor-pointer hover:shadow-lg transition relative ${selectedAddress?._id === address._id ? "border-4 border-red-500" : ""
                                    }`}
                                onClick={() => handleAddressSelection(address)}
                            >
                                <h3 className="font-bold">{address.Name}</h3>
                                <p>{address.street}, {address.city}</p>
                                <p>{address.state}, {address.country}</p>
                                <p>Phone: {address.Phone}</p>
                                <p>Postal Code: {address.postalCode}</p>

                               
                                <button className="absolute top-2 right-2 text-gray-500 hover:text-red-600">
                                <MdDelete size={30}/>
                                </button>
                            </div>
                        ))}

                      
                        <div className="bg-white p-4 w-full rounded-lg shadow-md cursor-pointer hover:shadow-lg transition flex justify-center items-center">
                            <button className="text-blue-500 font-semibold">
                            <Link to='/Add-Address'>
                            <IoAddCircleOutline size={40}/>
                            </Link>
                            </button>
                        </div>
                    </div>
                </div>


                
                <button
                    className="bg-green-500 text-white px-6 py-3 mt-6 rounded-md"
                    onClick={handlePayment}
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;
