export const authorizeRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    if (req.user.role !== role) {
      return res
        .status(403)
        .json({ message: "Acceso denegado: no tiene el rol requerido" });
    }

    next();
  };
};
