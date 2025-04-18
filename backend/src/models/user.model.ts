
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// Define the structure of the User model
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

// Create a Schema for User
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

// Password hashing middleware
userSchema.pre('save', async function (next) {
  // If the password is not modified, skip the hashing process
  if (!this.isModified('password')) return next();

  // Generate salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// Compare password method (for login)
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create the User model based on the schema
const User = mongoose.model<IUser>('User', userSchema);

export default User;
