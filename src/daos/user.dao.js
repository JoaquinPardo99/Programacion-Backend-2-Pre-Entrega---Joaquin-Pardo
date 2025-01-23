import User from "../models/user.model.js";

export class UserDAO {
  static async findAll() {
    return await User.find();
  }

  static async findByEmail(email) {
    return await User.findOne({ email });
  }

  static async findById(id) {
    return await User.findById(id);
  }

  static async create(data) {
    return await User.create(data);
  }
}
