import passport from "passport";
import localStrategy from "passport-local";
import jwt from "passport-jwt";
import User from "../models/user.model.js";
import { comparePassword } from "../utils/hashingUtils.js";
import dotenv from "dotenv";

dotenv.config();

const { SECRET_JWT } = process.env;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["authToken"];
  }
  return token;
};

passport.use(
  "login",
  new localStrategy.Strategy(
    { usernameField: "email", passwordField: "password", session: false },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user)
          return done(null, false, { message: "Usuario no encontrado" });

        const isValid = comparePassword(password, user.password);
        if (!isValid)
          return done(null, false, { message: "Contraseña incorrecta" });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "jwt",
  new jwt.Strategy(
    {
      jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: SECRET_JWT,
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.id);
        if (!user) return done(null, false);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
