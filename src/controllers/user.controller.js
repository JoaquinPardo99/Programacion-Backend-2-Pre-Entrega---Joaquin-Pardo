import { UserService } from "../services/user.service.js";
import { generateToken } from "../utils/generateToken.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const newUser = await UserService.createUser(req.body);

    const token = generateToken(newUser);

    res
      .cookie("authToken", token, { httpOnly: true, secure: false })
      .status(201)
      .json({
        message: "Usuario registrado y logueado exitosamente",
        user: newUser,
      });
  } catch (error) {
    res.status(500).json({ error: "El usuario ya existe" });
  }
};
