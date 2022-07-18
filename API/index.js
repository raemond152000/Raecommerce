const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv"); //import library to use .env
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");


dotenv.config(); // configuration to use .env

mongoose.connect(
    process.env.MONGO_URL //to hide mongo database connection through .env, using secret key name MONGO_URL
)
.then(()=>console.log("Database connection successful"))
.catch((err)=>{
    console.log(err);
});

//better to use routers to make it organize
/* app.get("/api/test", () => {
    console.log("test is successful");
}); */
app.use(cors());
app.use(express.json()) //to enable json to be used
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, ()=>{      //if no port number in env file use this port number
    console.log("Backend server is running!");
})