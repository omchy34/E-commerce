import { Cart } from "../models/userCart.model.js";

const AddToCart = async (req, res) => {
    const { ProductId, ProductName, Price, SubTotal, Quantity, Brand, Images } = req.body;

    try {
        if (!req.user.id || !ProductId || !ProductName || !Price || !SubTotal || !Quantity || !Brand || !Images) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const cartData = new Cart({
            userId: req.user.id,
            ProductId,
            ProductName,
            Price,
            SubTotal,
            Quantity,
            Brand,
            Images,
        });

        await cartData.save();
        res.status(201).json({ message: "Item added to cart", cartData });
    } catch (error) {
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

const updateCart = async (req, res) => {
    const { ProductId, ProductName, Price, SubTotal, Quantity, Brand, Images } = req.body;

    try {
        if (!req.user.id || !ProductId || !ProductName || !Price || !SubTotal || !Quantity || !Brand || !Images) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const updatedCart = await Cart.findOneAndUpdate(
            { userId: req.user.id, ProductId: req.params.id },
            {
                ProductId,
                ProductName,
                Price,
                SubTotal,
                Quantity,
                Brand,
                Images,
            },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        res.status(200).json({ message: "Item updated in cart", updatedCart });
    } catch (error) {
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};


const deleteFromCart = async (req, res) => {
    try {
        const deletedCart = await Cart.findOneAndDelete({ ProductId: req.params.id });
        if (!deletedCart) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json({ message: "Item deleted successfully", deletedCart });
    } catch (error) {
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};


const FetchCart = async (req, res) => {
    try {
        const  userId  = req.user.id;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const cartData = await Cart.find({ userId });
        res.status(200).json({ message: "Cart fetched successfully", newItem:cartData });
    } catch (error) {
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

export { AddToCart, updateCart, deleteFromCart, FetchCart };
