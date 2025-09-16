import Razorpay from "razorpay";
import crypto from "crypto";
import { Order } from "../models/Order.model.js";
import { User } from "../models/user.model.js";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const { ProductData, Address, subtotal, discount = 0, promoCode } = req.body;

    if (!ProductData || !Address || (!subtotal && subtotal !== 0)) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }

    // Validate ProductData
    if (!Array.isArray(ProductData) || ProductData.length === 0) {
      return res.status(400).json({ message: "ProductData must be a non-empty array." });
    }

    // Calculate final amount after discount
    let finalAmount = subtotal;
    if (discount > 0) {
      finalAmount = subtotal - (subtotal * discount);
    }

    // CRITICAL FIX: Convert to paise and ensure it's an integer
    const amountInPaise = Math.round(parseFloat(finalAmount) * 100);
    
    // Validate amount
    if (isNaN(amountInPaise) || amountInPaise <= 0) {
      return res.status(400).json({ message: "Invalid amount. Must be greater than 0." });
    }

    if (!Number.isInteger(amountInPaise)) {
      return res.status(400).json({ message: "Amount conversion failed." });
    }

    console.log("Final amount in rupees:", finalAmount);
    console.log("Amount in paise being sent to Razorpay:", amountInPaise);

    const options = {
      amount: amountInPaise, // Amount in paise (integer)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);
    
    if (!razorpayOrder) {
      return res.status(500).json({ message: "Unable to create Razorpay order." });
    }

    console.log("Razorpay order created successfully:", razorpayOrder.id);

    // Create order in database
    const newOrder = new Order({
      user: req.user.id,
      razorpayOrderId: razorpayOrder.id,
      paymentStatus: "PENDING",
      products: ProductData,
      subtotal: parseFloat(subtotal),
      discount: discount,
      promoCode: promoCode || null,
      finalAmount: parseFloat(finalAmount),
      amountInPaise: amountInPaise,
      Address,
      status: "Processing"
    });

    await newOrder.save();

    // Get user details for Razorpay options
    const user = await User.findById(req.user.id);

    const orderDetails = {
      razorpayOrderId: razorpayOrder.id,
      orderId: newOrder._id,
      amount: amountInPaise, // Send amount in paise
      subtotal: parseFloat(finalAmount), // Display amount in rupees
      customerName: user?.FullName || "Customer",
      email: user?.Email || "customer@example.com",
      currency: "INR"
    };

    return res.status(200).json({ 
      success: true,
      message: "Order created successfully",
      orderDetails 
    });

  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    
    // Handle specific Razorpay errors
    if (error.statusCode === 400) {
      return res.status(400).json({ 
        message: "Razorpay error: " + error.error?.description || "Invalid request",
        error: error.error 
      });
    }
    
    res.status(500).json({ 
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
};

export const verifyOrder = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: "Missing payment verification data." });
    }

    console.log("Verifying payment for order:", razorpay_order_id);
    console.log("Payment ID:", razorpay_payment_id);

    // Generate signature for verification
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      console.log("Signature verification failed");
      return res.status(400).json({ 
        success: false,
        message: "Invalid payment signature. Verification failed." 
      });
    }

    console.log("Signature verified successfully");

    // Find order by Razorpay order ID
    const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
    if (!order) {
      return res.status(404).json({ 
        success: false,
        message: "Order not found." 
      });
    }

    // Update order status
    order.paymentStatus = "SUCCESS";
    order.paymentId = razorpay_payment_id;
    order.status = "Confirmed";
    order.paidAt = new Date();
    await order.save();

    console.log("Order updated successfully:", order._id);

    // Clear user's cart after successful payment (optional)
    try {
      const { Cart } = await import("../models/userCart.model.js");
      await Cart.deleteMany({ userId: req.user.id });
      console.log("Cart cleared for user:", req.user.id);
    } catch (cartError) {
      console.log("Cart clearing failed (non-critical):", cartError.message);
    }

    res.status(200).json({ 
      success: true,
      message: "Payment verified successfully.", 
      orderDetails: order 
    });

  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
};

// Fetch User Orders
export const FetchOrder = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ message: "User ID not provided." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const orders = await Order.find({ user: user._id }).sort({ createdAt: -1 });
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user." });
    }

    res.status(200).json({ message: "Orders fetched successfully.", orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

export const fetchAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'FullName Email').sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found." });
    }
    res.status(200).json({ message: "All orders fetched successfully.", orders });
  } catch (error) {
    console.error("Error fetching orders for admin:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required." });
    }

    if (!status) {
      return res.status(400).json({ message: "Status is required." });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    order.status = status;
    if (status === "Delivered") {
      order.deliveredAt = new Date();
    }
    await order.save();

    res.status(200).json({ message: "Order status updated successfully.", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

export const fetchOrderId = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: "Order ID is required." });
    }

    const order = await Order.findById(id).populate('user', 'FullName Email');
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }
    
    res.status(200).json({ message: "Order fetched successfully.", order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};