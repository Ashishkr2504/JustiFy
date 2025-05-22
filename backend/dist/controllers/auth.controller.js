"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.getUserProfile = exports.loginUser = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const sendResetMail_1 = require("../utils/sendResetMail"); // Utility to send emails
// User Registration
const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body; // Extract firstName and lastName
    try {
        // Check if user already exists
        const userExists = await user_model_1.default.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Validate the input fields
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Combine firstName and lastName into a single name field
        const name = `${firstName} ${lastName}`;
        // Hash the password
        // const hashedPassword = await bcrypt.hash(password, 10).then((hash) => hash);
        // console.log('Hashed password:', hashedPassword); // Log the hashed password
        // Create a new user
        const user = new user_model_1.default({ name, email, password: password });
        await user.save();
        // Respond with a success message
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Error registering user', error });
    }
};
exports.registerUser = registerUser;
// User Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User does not exist' });
            return;
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: 'Incorrect password' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        // Respond with a success message and the token
        res.status(200).json({ message: 'Login successful', token });
    }
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error logging in', error });
    }
};
exports.loginUser = loginUser;
// Get User Profile
const getUserProfile = async (req, res) => {
    var _a;
    try {
        const user = await user_model_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error });
    }
};
exports.getUserProfile = getUserProfile;
// Forgot Password
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        // Check if the user exists
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User does not exist.' });
        }
        // Generate a password reset token
        const resetToken = crypto_1.default.randomBytes(32).toString('hex'); // Generate plain token
        user.resetPasswordToken = crypto_1.default
            .createHash('sha256')
            .update(resetToken)
            .digest('hex'); // Hash the token and store it in the database
        user.resetPasswordExpires = new Date(Date.now() + 3600000); // Token valid for 1 hour
        await user.save();
        // Send the reset email
        // console.log('Preparing to send email to:', user.email);
        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
        // console.log('Reset URL:', resetUrl);
        const message = `
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetUrl}" target="_blank">${resetUrl}</a>
    `;
        await (0, sendResetMail_1.sendResetMail)({
            name: user.name,
            email: user.email,
            subject: 'Password Reset Request',
            message,
        });
        res.status(200).json({ message: 'Password reset email sent successfully.' });
    }
    catch (error) {
        console.error('Error during password reset:', error);
        res.status(500).json({ message: 'Error sending password reset email.' });
    }
};
exports.forgotPassword = forgotPassword;
// Reset Password
const resetPassword = async (req, res) => {
    const { token, password } = req.body;
    try {
        // Hash the token to match the stored hashed token
        const hashedToken = crypto_1.default.createHash('sha256').update(token).digest('hex');
        // Find the user with the matching reset token and check if the token is still valid
        const user = await user_model_1.default.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }, // Ensure the token has not expired
        });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token.' });
        }
        // Hash the new password
        // const hashedPassword = await bcrypt.hash(password, 10);
        // Update the user's password and clear the reset token fields
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        res.status(200).json({ message: 'Password reset successful.' });
    }
    catch (error) {
        console.error('Error during password reset:', error);
        res.status(500).json({ message: 'Error resetting password.' });
    }
};
exports.resetPassword = resetPassword;
