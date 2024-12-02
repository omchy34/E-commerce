import { Category } from "../models/Category.model.js";

const AddCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Please enter a category name" });
        }
        const category = new Category({ name });
        await category.save();
        res.status(201).json({ message: "Category Added Successfully" });
    } catch (error) {
        res.status(500).json({ message: "server error: " + error.message });
    }
};

const DeleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCategory = await Category.findByIdAndDelete(id);
        if (!deleteCategory) {
            return res.status(404).json({ message: "Category  not found" });
        }
        res.status(200).json({ message: "Category is deleted" });
    } catch (error) {
        res.status(500).json({ message: "server error" });
    }
};

const GetAllCategory = async (req, res) => {
    try {
        const categories = await Category.find().exec();
        if (!categories) {
            return res.status(404).json({ message: "No categories found" });
        }
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "server error: " + error.message });
    }
};

export { AddCategory, DeleteCategory , GetAllCategory};
