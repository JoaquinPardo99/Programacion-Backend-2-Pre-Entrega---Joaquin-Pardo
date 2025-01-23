import express from "express";
import passport from "passport";
import { authorizeRole } from "../middlewares/authorization.js";
import {
  getProducts,
  createProduct,
} from "../controllers/products.controller.js";
import { validateProduct } from "../middlewares/productValidations.js";

const router = express.Router();

router.get("/", getProducts);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorizeRole("admin"),
  validateProduct,
  createProduct
);

export default router;
