const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailService = require("../services/email.service");

// Register

const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({

            name,
            email,
            password: hashedPassword



        });

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true
        });

        res.status(201).json({
            message: "User Registered Successfully",
            user
        });
       await emailService.sendRegisterEmail(user.email, user.name);


    } catch (err) {

        res.status(500).json({
            message: err.message
        });


    }

};


// Login

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid Password"
            });

        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true
        });

        res.status(200).json({
            message: "Login Successful"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

module.exports = {
    registerUser,
    loginUser
};