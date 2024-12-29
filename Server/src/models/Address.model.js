import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true
    },
    street: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    Phone: {
        type: Number,
        required: true,
        trim: true,
    },
    postalCode: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true
});

export const Address = mongoose.model('Address', addressSchema);


