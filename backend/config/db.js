import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB Connected Successfully");
    } catch(err) {
        console.error(err);
        process.exit(1);
    };
};