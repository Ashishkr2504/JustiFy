import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// Define the structure of the User model
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
}

// Create a Schema for User
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
});

// Password hashing middleware
userSchema.pre<IUser>('save', async function (next) {
  const user = this; // 'this' is now correctly typed as 'IUser'
  
  // If the password is not modified, skip the hashing process
  if (!user.isModified('password')) return next();
 
  user.password = await bcrypt.hash(user.password, 10);

  next();
});

// Compare password method (for login)
interface IUserMethods {
  isPasswordCorrect(password: string): Promise<boolean>;
}

// Create the User model based on the schema
const User = mongoose.model<IUser>('User', userSchema);

export default User;
