import express from "express";
import { register, login, updateUser } from "../controllers/auth.js";
import authMid from "../middleware/authentication.js";
import testUser from "../middleware/testUser.js";
import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    msg: "Too many requests from this IP, please try again after 15 minutes",
  },
});

const authRouter = express.Router();

authRouter.post("/register", apiLimiter, register);
authRouter.post("/login", apiLimiter, login);
authRouter.patch("/updateUser", authMid, testUser, updateUser);

export default authRouter;
