import { CartService } from "../services/cart.service.js";

export const createCart = async (req, res) => {
  try {
    const cart = await CartService.create(req.user._id);
    res.status(201).json({ message: "Carrito creado exitosamente", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCart = async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await CartService.getCartById(cid);
    res.status(200).json({ cart });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const addProductToCart = async (req, res) => {
  const { cid } = req.params;
  const { productId, quantity } = req.body;

  try {
    const updatedCart = await CartService.addProduct(cid, productId, quantity);
    res
      .status(200)
      .json({ message: "Producto agregado al carrito", cart: updatedCart });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const clearCart = async (req, res) => {
  const { cid } = req.params;

  try {
    const clearedCart = await CartService.clearCart(cid, req.user._id);
    res
      .status(200)
      .json({ message: "Carrito limpiado exitosamente", cart: clearedCart });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const purchaseCart = async (req, res) => {
  const { cid } = req.params;

  try {
    const { ticket, unavailableProducts } = await CartService.purchase(
      cid,
      req.user.email
    );
    res
      .status(200)
      .json({ message: "Compra finalizada", ticket, unavailableProducts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
