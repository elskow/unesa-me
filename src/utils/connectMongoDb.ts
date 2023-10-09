import mongoose from 'mongoose';

const connectMongoDB = async () => {
    try {
        // @ts-ignore
        await mongoose.connect(process.env.MONGODB_URL);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        console.log('Here is the MONGODB_URL:', process.env.MONGODB_URL);
    }
};

export default connectMongoDB;
