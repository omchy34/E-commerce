import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  ProductId: { type: String, required: true },
  ProductName: { type: String, required: true },
  Price: { type: String, required: true },
  Quantity: { type: Number, required: true },
  Images: { type: [String], required: true },
});

const OrderSchema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    razorpayOrderId: { type: String },
    subtotal: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ['PENDING', 'SUCCESS', 'FAILED'],
      default: 'PENDING',
    },
    products: [ProductSchema],
    Address: { type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", OrderSchema);
