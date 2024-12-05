import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  ProductName: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Category: [{
    type: String,
    required: true
  }],
  BestDeals: [{
    type: String,
  }],
  SpecialCategory: {
    type: String,
    required:true,
  },
  Stock: {
    type: String,
    required: true,
  },
  Brand: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  About: [
    {
      type: String,
      required: true,
    },
  ],
  Images: [
    {
      type: String,
      required: true,
    },
  ],
});

export const Product = mongoose.model("Product", productSchema);


