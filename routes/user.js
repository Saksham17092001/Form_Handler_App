const express = require("express");
const router = express.Router();
const User = require("../schema/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

router.post("/register", async (req, res) => {
    const { name, email, password, confirmPassword} = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
    }

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
        return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(200).json({ message: "User created successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error creating user", error: err.message });
    }
});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare the password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const payload = { id: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        console.log("Token being sent:", token);

        res.status(200).json({ 
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (err) {
        console.error("Error during login:", err.message);
        res.status(500).json({ message: "Server error, please try again later" });
    }
});



module.exports= router;