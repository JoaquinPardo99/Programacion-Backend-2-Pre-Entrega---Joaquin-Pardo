import express from "express";
import passport from "passport";
import { getCart } from "../controllers/cart.controller.js";
import { addProductToCart } from "../controllers/cart.controller.js";
import { authorizeRole } from "../middlewares/authorization.js";
import { createCart } from "../controllers/cart.controller.js";
import { allowOnlyUsers } from "../middlewares/authorization.js";
import { purchaseCart } from "../controllers/cart.controller.js";
import { clearCart } from "../controllers/cart.controller.js";
import { validateCartItem } from "../middlewares/cartValidations.js";

const router = express.Router();

router.get(
  "/:cid",
  passport.authenticate("jwt", { session: false }),
  authorizeRole("user"),
  getCart
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  allowOnlyUsers,
  createCart
);

router.post(
  "/:cid/products",
  passport.authenticate("jwt", { session: false }),
  authorizeRole("user"),
  validateCartItem,
  addProductToCart
);

router.post(
  "/:cid/purchase",
  passport.authenticate("jwt", { session: false }),
  authorizeRole("user"),
  purchaseCart
);

router.delete(
  "/:cid",
  passport.authenticate("jwt", { session: false }),
  authorizeRole("user"),
  clearCart
);

export default router;
