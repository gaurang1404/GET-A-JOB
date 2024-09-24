import express from "express";
import { logIn, logOut, signUp, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";

const UserRouter = express.Router();

UserRouter.route("/signup").post(singleUpload, signUp);
UserRouter.route("/login").post(logIn);
UserRouter.route("/profile/update").put(isAuthenticated, updateProfile);
UserRouter.route("/logout").get(logOut);

export default UserRouter;