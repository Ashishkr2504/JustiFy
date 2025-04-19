import { Request, Response } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendResetMail } from '../utils/sendResetMail'; // Utility to send emails

// User Registration
export const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body; // Extract firstName and lastName

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
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
    const user = new User({ name, email, password: password});
    await user.save();

    // Respond with a success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// User Login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User does not exist' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Incorrect password' });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: '7d',
    });

    // Respond with a success message and the token
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Get User Profile
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error });
  }
};

// Forgot Password
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User does not exist.' });
    }

    // Generate a password reset token
    const resetToken = crypto.randomBytes(32).toString('hex'); // Generate plain token
    user.resetPasswordToken = crypto
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

    await sendResetMail({
      name: user.name,
      email: user.email,
      subject: 'Password Reset Request',
      message,
    });

    res.status(200).json({ message: 'Password reset email sent successfully.' });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({ message: 'Error sending password reset email.' });
  }
};

// Reset Password
export const resetPassword = async (req: Request, res: Response) => {
  const { token, password } = req.body;

  try {
    // Hash the token to match the stored hashed token
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find the user with the matching reset token and check if the token is still valid
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }, // Ensure the token has not expired
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token.' });
    }

    // Hash the new password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and clear the reset token fields
    user.password = password; // Use the plain password for now
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful.' });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({ message: 'Error resetting password.' });
  }
};
