import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance.js';

const AddressForm = () => {
    const [formData, setFormData] = useState({
        Name: '',
        street: '',
        city: '',
        state: '',
        country: '',
        Phone: '',
        postalCode: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post(`/api/v1/users/Addaddress`,formData , {
                withCredentials : true
            })
            if (res) {
                navigate('/Address');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 md:m-14">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Add New Address</h2>
                {['Name', 'street', 'city', 'state', 'country', 'Phone', 'postalCode'].map((field) => (
                    <div className="mb-4" key={field}>
                        <label className="block text-sm  font-medium">
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        <input
                            type={field === 'Phone' ? 'tel' : 'text'}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            className="w-full p-1 border rounded-md"
                            required
                        />
                    </div>
                ))}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition">
                    Save Address
                </button>
            </form>
        </div>
    );
};

export default AddressForm;
