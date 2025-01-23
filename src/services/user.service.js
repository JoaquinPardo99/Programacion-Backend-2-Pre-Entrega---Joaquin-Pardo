import { UserRepository } from "../repositories/user.repository.js";
import { hashPassword, comparePassword } from "../utils/hashingUtils.js";
import { UserDTO } from "../dtos/user.dto.js";

export class UserService {
  static async getAllUsers() {
    const users = await UserRepository.getAll();
    return users.map((user) => new UserDTO(user));
  }

  static async getUserByEmail(email) {
    const user = await UserRepository.getByEmail(email);
    if (!user) throw new Error("Usuario no encontrado");
    return new UserDTO(user);
  }

  static async createUser(userData) {
    userData.password = hashPassword(userData.password);

    return await UserRepository.create(userData);
  }
  static async validatePassword(email, password) {
    const user = await UserRepository.getByEmail(email);
    if (!user) throw new Error("Usuario no encontrado");
    const isValid = comparePassword(password, user.password);
    return isValid;
  }
}
