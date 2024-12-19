import express from "express";
import passport from "passport";

const router = express.Router();

router.post("/logout", (req, res) => {
  res.clearCookie("authToken");
  res.json({ message: "Logout exitoso" });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const user = req.user;
    res.json({ user });
  }
);

export default router;
