const express = require("express");
const cors = require("cors");
const conn = require("./conn/conn"); 
const cookieParser=require("cookie-parser");
const bookRoutes = require("./routes/bookRoutes");
const userRoutes=require('./routes/userRoutes');
const cartRoutes=require('./routes/cartRoutes');
const favouriteRoutes=require('./routes/favouriteRoutes');
const orderRoutes=require('./routes/orderRoutes');
require("dotenv").config(); 

const app = express();

// Middlewares
app.use(cors({
  origin: ["http://localhost:5173", "https://book-orbit-xi.vercel.app", "https://book-orbit-2025-aastha-oswal.vercel.app", "https://book-orbit-2025.vercel.app"],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());


conn();


app.use("/api/v1/users", userRoutes);

app.use("/api/v1/books", bookRoutes);

app.use("/api/v1/favourites",favouriteRoutes);

app.use("/api/v1/cart", cartRoutes);

app.use("/api/v1/orders",orderRoutes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log("Server running ");
});
