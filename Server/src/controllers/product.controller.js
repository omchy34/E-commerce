import { Product } from "../models/product.model.js";
import { uploadImages } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";

const AddProduct = async (req, res) => {
    const {
        ProductName,
        Price,
        About,
        SepicalCategory,
        Description,
        Brand,
        Stock,
        BestDeals,
        Category,
    } = req.body;


    if (!ProductName || !Price || !About || !Description || !SepicalCategory || !Brand || !Stock || !BestDeals || !Category) {
        return res.status(400).json({ message: "Please fill in all fields" });
    }


    const aboutArray = Array.isArray(About) ? About : About.split(',').map(item => item.trim());

    try {

        const imageFiles = req.files;
        if (!imageFiles || imageFiles.length === 0) {
            return res.status(400).json({ message: "Please upload at least one image" });
        }


        const imageBuffers = imageFiles.map(file => file.buffer);
        const uploadResults = await uploadImages(imageBuffers);


        const imageUrls = uploadResults.map(result => result.secure_url);


        const newProduct = new Product({
            ProductName,
            Price,
            About: aboutArray,
            Description,
            Brand,
            Stock,
            SepicalCategory,
            BestDeals,
            Category,
            Images: imageUrls,
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
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const deleteImagePromises = product.images.map(async (imageUrl) => {

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
        const allProducts = await Product.find({}); // Use the correct model
        return res.status(200).json({ allProducts, message: "Products fetched successfully" });
    } catch (error) {
        console.error("Error fetching products:", error); // Log the error for debugging
        return res.status(500).json({ message: "Something went wrong while listing the products" });
    }
};

const ProductDetails = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(401).json({ message: "product id is required" })
        }
        const ProductDetails = await Product.findById(id);

        if (!ProductDetails) {
            throw new ApiError(404, "Product not found")
        }

        res.json(new ApiResponse(200, ProductDetails, "product founded"))
    } catch (error) {
        res.status(500).json({ message: 'something went wrong....' })
    }
}

// Add To Cart 

const addToCart = async (req, res) => {
    try {
        const { ProductId, quantity } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        for (let i = 0; i < ProductId.length; i++) {
            const productId = ProductId[i];

            const product = await Product.findById(productId);

            for (let i = 0; i < quantity.length; i++) {
                const quantity = quantity[i];
            }
                
            if (!product) {
                return res.status(404).json({ message: `Product not found with ID: ${productId}` });
            }
        
        
            const productInCart = user.CartData.find((item) => item.productId.toString() === productId.toString());

            if (productInCart) {
                productInCart.quantity += qty; // Increment existing quantity
            } else {
                user.CartData.push({
                    productId,
                    quantity: qty // Push the new product with its quantity
                });
            }
        }

        // Save the updated user cart
        await user.save();

        res.status(200).json({ message: 'Products added to cart', cart: user.CartData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const FetchCartData = async () => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            message: 'Cart data fetched successfully', cart: user.CartData
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}



export { AddProduct, deleteProduct, FetchAllProduct, ProductDetails , FetchCartData , addToCart};
