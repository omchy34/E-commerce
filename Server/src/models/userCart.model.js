import mongoose, { Schema } from "mongoose";

const CartSchema = new Schema({
    ProductId: {
        type: String,
        required: true,
    },
    ProductName: {
        type: String,
        required: true,
    },
    Price: {
        type: Number,
        required: true,
    },
    SubTotal: {
        type : Number ,
        required: true ,
    },
    Quantity: {
        type: Number,
        required: true
    },
    Brand: {
        type: String,
        required: true,
    },
    Images: [
        {
            type: String,
            required: true,
        },
    ],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

export const Cart = mongoose.model("Cart", CartSchema);