const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter  = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const addressRouter = require("./routes/shop/address-routes");
const shopOderRouter = require("./routes/shop/order-routes");


// const mongoDB_Url = process.env.MONGODB_URI;
// console.log(mongoDB_Url);

mongoose.connect("mongodb+srv://harishsen:hksen7976@cluster1.0lhag.mongodb.net/")
.then(()=>console.log("mongoDB connected"))
.catch((error)=>console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin : "http://localhost:5173",
        methods : [ "GET" , "POST" , "DELETE" , "PUT"],
        allowedHeaders : [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "pragma"
        ],
        credentials : true
    })
)

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products" , adminProductsRouter);
app.use("/api/admin/orders" , adminOrderRouter);
app.use("/api/shop/products" , shopProductsRouter);
app.use("/api/shop/cart" , shopCartRouter);
app.use("/api/shop/address" , addressRouter);
app.use("/api/shop/order" , shopOderRouter);


app.listen(PORT , ()=> console.log(`server is now running on port ${PORT}`));