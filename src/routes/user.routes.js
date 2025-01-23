import express from "express";
import { getAllUsers, registerUser } from "../controllers/user.controller.js";
import { validateUser } from "../middlewares/userValidations.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/register", validateUser, registerUser);

export default router;
