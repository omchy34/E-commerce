import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from 'dotenv' ;

dotenv.config({
    path: "./.env"
}) ;




connectDB().then(() => {
    app.listen(process.env.PORT || 7672 , () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
}).catch((error) => {
    console.log("MONGO db connection failed !!! ", error);
})