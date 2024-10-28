import mongoose, { Schema } from "mongoose";

const BestDealsSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    }
})

export const BestDeals = mongoose.model("BestDeals" , BestDealsSchema)