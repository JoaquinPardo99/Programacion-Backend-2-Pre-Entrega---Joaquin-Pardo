import { CartDAO } from "../daos/cart.dao.js";

export class CartRepository {
  static async create(data) {
    return await CartDAO.create(data);
  }
  static async getCartById(cartId) {
    return await CartDAO.findById(cartId);
  }

  static async updateCart(cartId, updatedCart) {
    return await CartDAO.updateCart(cartId, updatedCart);
  }
}
