export const authorizeRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Acceso denegado" });
    }
    next();
  };
};

export const allowOnlyUsers = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({
      message: "Solo los usuarios con rol 'user' pueden crear carritos",
    });
  }
  next();
};
