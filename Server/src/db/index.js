import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

 async function connectDB() {
    try {
       const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
       console.log(`\n MONGOOSE DB CONNECTED !! DB HOST ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(`mongooseDB connection ERROR ${error}`);
        process.exit(1);
    };
}

export default connectDB ;