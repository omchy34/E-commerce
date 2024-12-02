import mongoose, { Schema } from "mongoose";

const SpecialCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  images:
  {
    type: String,
    required:true ,
  },

})


const BannerSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  images:
  {
    type: String,
    required:true,
  },

})

export const Banner = mongoose.model("Banner", BannerSchema);
export const SpecialCategory = mongoose.model("SpecialCategory", SpecialCategorySchema);