import { ProductService } from "../services/product.service.js";

export const getProducts = async (req, res) => {
  try {
    const products = await ProductService.getAll();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await ProductService.create(req.body);
    res.status(201).json({ message: "Producto creado", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
