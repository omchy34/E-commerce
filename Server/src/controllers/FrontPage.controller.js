import { SpecialCategory, Banner } from "../models/FrontPage.model.js";
import { uploadImages } from "../utils/cloudinary.js";

const sepicalcategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    const images = req.file;
    if (!images) {
        return res.status(400).json({ message: "Please upload an image" });
    }

    
    const uploadResult = await uploadImages(images.buffer);
    if (!uploadResult || uploadResult.length === 0) {
        return res.status(401).json({ message: "Image upload failed" });
    }

    const imageUrl = uploadResult[0].secure_url; 
    console.log("Uploaded Image URL:", imageUrl);

    if (!imageUrl) {
        return res.status(401).json({ message: "Image URL is undefined" });
    }

   
    const newSepicalCategory = await SpecialCategory.create({
        name,
        images: imageUrl, 
    });

    res.status(200).json({ message: "Banner added successfully", newSepicalCategory });
} catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Backend error", error: error.message });
}
};

const banner = async (req, res) => {
  try {
      const { name } = req.body;

      if (!name) {
          return res.status(400).json({ message: "Please fill all fields" });
      }

      const images = req.file;
      if (!images) {
          return res.status(400).json({ message: "Please upload an image" });
      }

   
      const uploadResult = await uploadImages(images.buffer); 
      if (!uploadResult || uploadResult.length === 0) {
          return res.status(401).json({ message: "Image upload failed" });
      }

      const imageUrl = uploadResult[0].secure_url; 
      console.log("Uploaded Image URL:", imageUrl);

      if (!imageUrl) {
          return res.status(401).json({ message: "Image URL is undefined" });
      }

      
      const newBanner = await Banner.create({
          name,
          images: imageUrl, 
      });

      res.status(200).json({ message: "Banner added successfully", newBanner });
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Backend error", error: error.message });
  }
};


const GetAllBanner = async (req, res) => {
  try {
    const allBanners = await Banner.find({});
    res.status(200).json({ message: "All banners fetched", allBanners });
  } catch (error) {
    res.status(500).json({ message: "Backend error", error: error.message });
  }
};

const GetAllSepicalCategory = async (req, res) => {
  try {
    const allSepicalCategory = await SpecialCategory.find({});
    res.status(200).json({ message: "All special categories fetched", allSepicalCategory });
  } catch (error) {
    res.status(500).json({ message: "Backend error", error: error.message });
  }
};

export { sepicalcategory, banner, GetAllBanner, GetAllSepicalCategory };
