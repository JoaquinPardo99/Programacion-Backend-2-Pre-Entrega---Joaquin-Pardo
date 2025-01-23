import Product from "../models/product.model.js";

export class ProductDAO {
  static async findById(productId) {
    return await Product.findById(productId);
  }

  static async update(productId, updatedProduct) {
    return await Product.findByIdAndUpdate(productId, updatedProduct, {
      new: true,
    });
  }
  static async findAll() {
    return await Product.find();
  }

  static async create(data) {
    return await Product.create(data);
  }
}
