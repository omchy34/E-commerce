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
    const { ProductData, Address, subtotal } = req.body;
    
    if (!ProductData || !Address || !subtotal) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }
    
    const options = {
      amount: subtotal * 100, 
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpayInstance.orders.create(options);
    if (!order) {
      return res.status(500).json({ message: "Unable to create Razorpay order." });
    }


    const newOrder = new Order({
      user: req.user.id,
      razorpayOrderId: order.id,
      paymentStatus: "PENDING",
      products: ProductData,
      subtotal,
      Address,
    });

    await newOrder.save();

    return res.status(200).json({ orderDetails: newOrder });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const verifyOrder = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: "Missing payment verification data." });
    }

    console.log("Signature:", razorpay_signature);
    console.log("Payment ID:", razorpay_payment_id);


    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature. Verification failed." });
    }


    const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }


    order.paymentStatus = "SUCCESS";
    order.paymentId = razorpay_payment_id;
    await order.save();

    res.status(200).json({ message: "Payment verified successfully.", orderDetails: order });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: "Internal server error" });
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

    const orders = await Order.find({ user: user._id });
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
    const orders = await Order.find().populate('user', 'FullName');

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found." });
    }
    res.status(200).json({ message: "All orders fetched successfully.", orders });
  } catch (error) {
    console.error("Error fetching orders for admin:", error);
    res.status(500).json({ message: "Internal server error.", error: error.message });
  }
};

