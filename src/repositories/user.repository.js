import { UserDAO } from "../daos/user.dao.js";

export class UserRepository {
  static async getAll() {
    return await UserDAO.findAll();
  }

  static async getByEmail(email) {
    return await UserDAO.findByEmail(email);
  }

  static async getById(id) {
    return await UserDAO.findById(id);
  }

  static async create(data) {
    return await UserDAO.create(data);
  }
}
