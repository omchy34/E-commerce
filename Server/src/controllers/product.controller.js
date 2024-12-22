
import { Product } from "../models/product.model.js";
import { uploadImages } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";

const AddProduct = async (req, res) => {
    const { ProductName, Price, About, SpecialCategory, Description, Brand, Stock, BestDeals, Category } = req.body;

    if (!ProductName || !Price || !About || !Description || !SpecialCategory || !Brand || !Stock || !BestDeals || !Category) {
        return res.status(400).json({ message: "Please fill in all fields" });
    }

    try {
        const aboutArray = Array.isArray(About) ? About : About.split(',').map(item => item.trim());
        const imageBuffers = req.files.map(file => file.buffer);
        const uploadResults = await uploadImages(imageBuffers);
        const imageUrls = uploadResults.map(result => result.secure_url);

        const newProduct = new Product({
            ProductName, Price, About: aboutArray, Description, Brand, Stock, SpecialCategory, BestDeals, Category, Images: imageUrls,
        });

        await newProduct.save();
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const deleteImagePromises = product.Images.map(async (imageUrl) => {
            const publicId = imageUrl.split('/').pop().split('.')[0];
            await deleteImage(publicId);
        });

        await Promise.all(deleteImagePromises);
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: "Product and images deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

const FetchAllProduct = async (req, res) => {
    try {
        const allProducts = await Product.find({});
        res.status(200).json({ allProducts, message: "Products fetched successfully" });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

const ProductDetails = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "Product ID is required" });

        const productDetails = await Product.findById(id);
        if (!productDetails) return res.status(404).json({ message: "Product not found" });

        res.status(200).json({ product: productDetails });
    } catch (error) {
        console.error("Error fetching product details:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

export { AddProduct, deleteProduct, FetchAllProduct, ProductDetails };
