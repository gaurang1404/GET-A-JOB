import express from "express";
import { getCompany, getCompanyById, register, updateProfile } from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/auth.js";

const CompanyRouter = express.Router();

CompanyRouter.route("/register").post(isAuthenticated, register);
CompanyRouter.route("/get").get(isAuthenticated, getCompany);
CompanyRouter.route("/get/:id").get(isAuthenticated, getCompanyById);
CompanyRouter.route("/profile/update/:id").put(isAuthenticated, updateProfile);

export default CompanyRouter;