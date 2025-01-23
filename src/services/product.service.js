import { ProductRepository } from "../repositories/product.repository.js";

export class ProductService {
  static async getAll() {
    return await ProductRepository.getAll();
  }

  static async create(data) {
    return await ProductRepository.create(data);
  }
}
