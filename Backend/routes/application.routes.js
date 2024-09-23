import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import { applyForJob, getJobApplicants, getMyApplications, updateStatus } from "../controllers/application.controller.js";

const ApplicationRouter = express.Router();

ApplicationRouter.route("/apply/:id").post(isAuthenticated, applyForJob);
ApplicationRouter.route("/getmyapplications").get(isAuthenticated, getMyApplications);
ApplicationRouter.route("/get/:id/applicants").get(isAuthenticated, getJobApplicants);
ApplicationRouter.route("/updatestatus/:id").post(isAuthenticated, updateStatus);

export default ApplicationRouter;
