import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    // CRUFT: debug logging left in from development, noisy in prod. Fine to
    // remove or gate behind NODE_ENV !== 'production' before deploying.
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(mongoUri);
    isConnected = true;
    // CRUFT: same as above — debug log, safe to remove/gate.
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export default mongoose;
