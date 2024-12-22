import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// User Schema
const userSchema = new Schema({
    FullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    Email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    Phone: {
        type: String,
        required: true,
        trim: true,
        unique:true,
    },
    Password: {
        type: String,
        required: true,
        minlength:8,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    } ,
    AccessToken: {
        type : String
    }
});

// Pre-save hook to hash the password
userSchema.pre("save", async function (next) {
    if (!this.isModified("Password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.Password = await bcrypt.hash(this.Password, salt);
    next() ;
});

export const User = mongoose.model("User", userSchema);
