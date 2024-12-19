import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./src/config/passport.config.js";
import usersRoutes from "./src/routes/users.routes.js";
import sessionsRoutes from "./src/routes/sessions.routes.js";
import productsRoutes from "./src/routes/products.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/users", usersRoutes);
app.use("/api/sessions", sessionsRoutes);
app.use("/api/products", productsRoutes);

mongoose.connect(process.env.MONGO);

app.listen(process.env.PORT, () =>
  console.log("Server in port " + process.env.PORT)
);
