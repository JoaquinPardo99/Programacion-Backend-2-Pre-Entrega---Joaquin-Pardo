import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "passport";
import { connectDB } from "./config/mongo.config.js";
import "./config/passport.config.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/products.routes.js";
import sessionRoutes from "./routes/sessions.routes.js";
import cartRoutes from "./routes/cart.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/carts", cartRoutes);

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Servidor corriendo en el puerto ${PORT}`)
  );
});
