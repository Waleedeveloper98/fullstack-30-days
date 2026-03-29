import mongoose from "mongoose";
import config from "./config.js";

const connectToDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("Connected to DB🔒")
    } catch (error) {
        console.log(`Database connection error ${err || err.message}`)
    }
}

export default connectToDB;