import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in the environment');
    }

    await mongoose.connect(process.env.MONGO_URI)

    console.log('MongoDB connected');
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.error('MongoDB connection failed:', errorMessage);
    process.exit(1);
  }
};

export default connectDB;
