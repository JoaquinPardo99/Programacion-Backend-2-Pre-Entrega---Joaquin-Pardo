import express from "express";
import passport from "passport";
import User from "../models/user.model.js";
import { hashPassword } from "../utils/hashingUtils.js";
import { generateToken } from "../utils/generateToken.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password, role } = req.body;
  try {
    const hashedPassword = hashPassword(password);
    const newUser = await User.create({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword,
      role: role || "user",
    });
    res.status(201).json({ message: "Usuario creado", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post(
  "/login",
  passport.authenticate("login", { session: false }),
  (req, res) => {
    const user = req.user;
    const token = generateToken(user);
    res
      .cookie("authToken", token, { httpOnly: true })
      .json({ message: "Login exitoso" });
  }
);

export default router;
