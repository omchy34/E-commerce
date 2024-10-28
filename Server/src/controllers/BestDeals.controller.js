import { BestDeals } from "../models/BestDeals.model.js"

const AddBestDeals = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Please enter a BestDeasl name" })
        }
        const createBestDeals = new BestDeals({ name });
        await createBestDeals.save();
        res.status(201).json({ message: "BestDeasl Added Successfully" });

    } catch (error) {
        res.status(500).json({ message: "server error: " + error.message });
    }
}

const DeleteBestDeals = async(req,res)=>{
    try {
        const {id} = req.params ;
        const deleteBestDeals = await BestDeals.findByIdAndDelete(id);
        if(!deleteBestDeals) {
            return res.status(404).json({ message: "BestDeals not found" });
        }
        res.status(200).json({message:'best deals is deleted'})
    } catch (error) {
        res.status(500).json({message:'server error'})
    }
}

const GetAllBestDeals = async (req, res) => {
    try {
        const bestDeals = await BestDeals.find().exec();
        res.status(200).json(bestDeals);
    } catch (error) {
        res.status(500).json({ message: "server error: " + error.message });
    }
}

export { AddBestDeals , DeleteBestDeals , GetAllBestDeals}