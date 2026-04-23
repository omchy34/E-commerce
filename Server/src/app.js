import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors"
import bodyParser from 'body-parser';

const app = express()

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = [
  "https://e-commerce-nfwv.onrender.com",
  "https://e-commerceadmin-j6xe.onrender.com"
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like Postman)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["POST", "GET", "DELETE", "PATCH", "HEAD", "PUT"],
    credentials: true,
}));

// import routes  
import UserRouter from "./routes/user.routes.js";
import ProductRouter from "./routes/product.routes.js"
import CategoryRouter from "./routes/Category.routes.js"
import BestDealsRouter from "./routes/BestDeals.routes.js"
import FrontPageRouter from "./routes/FrontPage.routes.js"
import CartRoutes from "./routes/Cart.routes.js"
import AddressRoute from "./routes/Address.routes.js"
import OrderRouter from "./routes/Order.routes.js"

// routes declerations 
app.use("/api/v1/users" , UserRouter) ;
app.use("/api/v1/users" , CartRoutes) ;
app.use("/api/v1/users" , AddressRoute) ;
app.use("/api/v1/admin" , ProductRouter) ;
app.use("/api/v1/admin" , CategoryRouter) ;
app.use("/api/v1/admin" , BestDealsRouter) ;
app.use("/api/v1/admin" , FrontPageRouter) ;
app.use("/api/v1/admin" , OrderRouter) ;


export { app } ;
