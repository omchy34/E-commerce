import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors"

const app = express()

app.use(cors({
    origin: [process.env.FRONTEND_CORS_ORIGIN, process.env.ADMIN_CORS_ORIGIN],
    methods: ["POST", "GET", "DELETE", "PATCH", "HEAD", "PUT"],
    credentials: true ,
}));


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static("public"));
app.use(cookieParser());

// import routes  
import UserRouter from "./routes/user.routes.js";
import ProductRouter from "./routes/product.routes.js"
import CategoryRouter from "./routes/Category.routes.js"
import BestDealsRouter from "./routes/BestDeals.routes.js"
import FrontPageRouter from "./routes/FrontPage.routes.js"
import CartRoutes from "./routes/Cart.routes.js"

// routes declerations 
app.use("/api/v1/users" , UserRouter) ;
app.use("/api/v1/users" , CartRoutes) ;
app.use("/api/v1/admin" , ProductRouter) ;
app.use("/api/v1/admin" , CategoryRouter) ;
app.use("/api/v1/admin" , BestDealsRouter) ;
app.use("/api/v1/admin" , FrontPageRouter) ;

export { app } ;