import express from "express";
import passport from "passport";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
} from "../controllers/session.controller.js";

const router = express.Router();

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  getCurrentUser
);

router.post(
  "/login",
  passport.authenticate("login", { session: false }),
  loginUser
);

router.post("/logout", logoutUser);

export default router;
