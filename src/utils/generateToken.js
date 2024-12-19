import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { SECRET_JWT } = process.env;

export const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, SECRET_JWT, {
    expiresIn: "1h",
  });
};
