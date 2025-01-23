import { body, validationResult } from "express-validator";

export const validateCartItem = [
  body("productId").notEmpty().withMessage("El ID del producto es obligatorio"),
  body("quantity")
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser un número entero positivo"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
