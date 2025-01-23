import { body, validationResult } from "express-validator";

export const validateUser = [
  body("first_name").notEmpty().withMessage("El nombre es obligatorio"),
  body("last_name").notEmpty().withMessage("El apellido es obligatorio"),
  body("email").isEmail().withMessage("El email debe ser válido"),
  body("age")
    .isInt({ min: 1 })
    .withMessage("La edad debe ser un número positivo"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
