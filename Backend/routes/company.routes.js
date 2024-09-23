import express from "express";
import { getCompany, getCompanyById, register, updateProfile } from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/auth.js";
import isJobRecruiter from "../middlewares/isJobRecruiter.middleware.js";

const CompanyRouter = express.Router();

CompanyRouter.route("/register").post(isAuthenticated, isJobRecruiter, register);
CompanyRouter.route("/get").get(isAuthenticated, isJobRecruiter, getCompany);
CompanyRouter.route("/get/:id").get(isAuthenticated, getCompanyById);
CompanyRouter.route("/profile/update/:id").put(isAuthenticated, isJobRecruiter, updateProfile);

export default CompanyRouter;