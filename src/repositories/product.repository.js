import { ProductDAO } from "../daos/product.dao.js";

export class ProductRepository {
  static async getAll() {
    return await ProductDAO.findAll();
  }
  static async getProductById(productId) {
    return await ProductDAO.findById(productId);
  }

  static async create(data) {
    return await ProductDAO.create(data);
  }

  static async updateProduct(productId, updatedProduct) {
    return await ProductDAO.update(productId, updatedProduct);
  }
}
