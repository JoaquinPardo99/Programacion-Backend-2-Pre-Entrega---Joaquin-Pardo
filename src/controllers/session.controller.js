import { UserDTO } from "../dtos/user.dto.js";
import { generateToken } from "../utils/generateToken.js";

export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const userDTO = UserDTO.toResponse(req.user);
    res.status(200).json({ user: userDTO });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = req.user;
    const token = generateToken(user);
    res
      .cookie("authToken", token, { httpOnly: true, secure: false })
      .json({ message: "Login exitoso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("authToken").json({ message: "Logout exitoso" });
};
