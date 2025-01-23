import Cart from "../models/cart.model.js";

export class CartDAO {
  static async create(data) {
    return await Cart.create(data);
  }
  static async findById(cartId) {
    return await Cart.findById(cartId).populate("products.product");
  }

  static async updateCart(cartId, updatedCart) {
    return await Cart.findByIdAndUpdate(cartId, updatedCart, { new: true });
  }
}
