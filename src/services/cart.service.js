import { CartRepository } from "../repositories/cart.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";
import { TicketService } from "./ticket.service.js";

export class CartService {
  static async create(userId) {
    return await CartRepository.create({ user: userId, products: [] });
  }

  static async getCartById(cartId) {
    const cart = await CartRepository.getCartById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    const detailedProducts = await Promise.all(
      cart.products.map(async (item) => {
        const product = await ProductRepository.getProductById(item.product);
        return {
          productId: product._id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          subtotal: item.quantity * product.price,
        };
      })
    );

    return { id: cart._id, user: cart.user, products: detailedProducts };
  }

  static async addProduct(cartId, productId, quantity) {
    const cart = await CartRepository.getCartById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    const product = await ProductRepository.getProductById(productId);
    if (!product) throw new Error("Producto no encontrado");

    if (quantity > product.stock) {
      throw new Error(
        `Stock insuficiente para el producto '${product.name}'. Stock disponible: ${product.stock}`
      );
    }

    const productInCart = cart.products.find(
      (item) => item.product.toString() === productId
    );

    if (productInCart) {
      const newQuantity = productInCart.quantity + quantity;

      if (newQuantity > product.stock) {
        throw new Error(
          `No hay suficiente stock para aumentar la cantidad del producto '${product.name}' en el carrito. Stock disponible: ${product.stock}`
        );
      }

      productInCart.quantity = newQuantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    return await CartRepository.updateCart(cartId, cart);
  }

  static async clearCart(cartId, userId) {
    const cart = await CartRepository.getCartById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    if (cart.user.toString() !== userId.toString()) {
      throw new Error("No tienes permiso para limpiar este carrito");
    }

    cart.products = [];
    return await CartRepository.updateCart(cartId, cart);
  }
  static async purchase(cartId, purchaserEmail) {
    const cart = await CartRepository.getCartById(cartId);
    if (!cart) throw new Error("Carrito no encontrado");

    let totalAmount = 0;
    const unavailableProducts = [];

    for (const item of cart.products) {
      const product = await ProductRepository.getProductById(item.product);
      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
        await ProductRepository.updateProduct(product._id, product);
        totalAmount += item.quantity * product.price;
      } else {
        unavailableProducts.push(item.product);
      }
    }

    const ticket = await TicketService.createTicket({
      amount: totalAmount,
      purchaser: purchaserEmail,
    });

    cart.products = cart.products.filter((item) =>
      unavailableProducts.includes(item.product.toString())
    );

    await CartRepository.updateCart(cart._id, cart);

    return { ticket, unavailableProducts };
  }
}
