import express from "express";
import passport from "passport";
import Product from "../models/product.model.js";
import { authorizeRole } from "../middlewares/authorization.js";

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorizeRole("admin"),
  async (req, res) => {
    try {
      const { name, description, price, category, stock } = req.body;
      const newProduct = await Product.create({
        name,
        description,
        price,
        category,
        stock,
      });
      res.status(201).json({ message: "Producto creado", product: newProduct });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
