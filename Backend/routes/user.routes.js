import express from "express";
import { logIn, logOut, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/auth.js";

const UserRouter = express.Router();

UserRouter.route("/register").post(register);
UserRouter.route("/login").post(logIn);
UserRouter.route("/profile/update").put(isAuthenticated, updateProfile);
UserRouter.route("/logout").get(logOut);

export default UserRouter;