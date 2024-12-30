import { User } from '../models/user.model.js';
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

const Registration = async (req, res) => {
    const { FullName, Email, Phone, Password } = req.body;

    if (!FullName || !Email || !Phone || !Password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        const newUser = await User.create({ FullName, Email, Phone, Password }); // No need to hash manually
        const AccessToken = jwt.sign({ id: newUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
        newUser.AccessToken = AccessToken;
        await newUser.save();

        res.cookie('AccessToken', AccessToken, { httpOnly: true, secure: true, sameSite: "None" });

        res.status(201).json({
            message: "User registered successfully.",
            user: {
                FullName: newUser.FullName,
                Email: newUser.Email,
                Phone: newUser.Phone,
                AccessToken: AccessToken
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error.", error });
    }
};

const Login = async (req, res) => {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    try {
        const user = await User.findOne({ Email });

        if (!user) {
            return res.status(401).json({ message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(Password, user.Password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const AccessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });

        res.cookie('AccessToken', AccessToken, { httpOnly: true, secure: true, sameSite: "None" });

        res.status(200).json({
            message: "Login successfully",
            user: {
                FullName: user.FullName,
                Email: user.Email,
                Phone: user.Phone,
                AccessToken: AccessToken
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Server error.", error });
    }
};

const userData = async (req, res) => {
    try {
        const user = req.user.id;
        const userData = await User.findById(user);
        console.log(userData);


        res.status(200).json({ userData })

    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}

const AllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ users })


    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}

const DeleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const DeleteUser = await User.findByIdAndDelete(id);
        res.status(200).json({ message: "user deleted successfully" , data:DeleteUser})

    } catch (error) {
        res.status(500).json({ message: "BACKEND ERROR", error })
    }
}

export { Registration, Login, userData, AllUsers, DeleteUser };


