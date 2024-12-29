import {Address} from '../models/Address.model.js'; // Update the path as necessary

const createAddress = async (req, res) => {
    try {
        const { Name, street, city, state, country, Phone, postalCode } = req.body;

        
        if (!Name || !street || !city || !state || !country || !Phone || !postalCode) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Create and save the new address
        const newAddress = new Address({ Name, street, city, state, country, Phone, postalCode });
        await newAddress.save();

        res.status(201).json({ message: 'Address created successfully!', data: newAddress });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create address.', error: error.message });
    }
};


const fetchAddresses = async (req, res) => {
    try {
        const addresses = await Address.find();
        res.status(200).json({ message: 'Addresses fetched successfully!', data: addresses });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch addresses.', error: error.message });
    }
};

const fetchAddressById = async (req, res) => {
    try {
        const { id } = req.params;
        const address = await Address.findById(id);

        if (!address) {
            return res.status(404).json({ message: 'Address not found.' });
        }

        res.status(200).json({ message: 'Address fetched successfully!', data: address });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch address.', error: error.message });
    }
};


const deleteAddress = async (req, res) => {
    try {
        const { id } = req.params;
        const address = await Address.findByIdAndDelete(id);

        if (!address) {
            return res.status(404).json({ message: 'Address not found.' });
        }

        res.status(200).json({ message: 'Address deleted successfully!', data: address });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete address.', error: error.message });
    }
};

export { createAddress, fetchAddresses, fetchAddressById, deleteAddress }
