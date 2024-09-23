import express from "express";
import isAuthenticated from "../middlewares/auth.js";
import isJobRecruiter from "../middlewares/isJobRecruiter.middleware.js";
import { createJob, getAllJobs, getCreaterJobs, getJobById } from "../controllers/job.controller.js";

const JobRouter = express.Router();

JobRouter.route("/create").post(isAuthenticated, isJobRecruiter, createJob);
JobRouter.route("/getall").get(isAuthenticated, getAllJobs);
JobRouter.route("/get/:id").get(isAuthenticated, getJobById);
JobRouter.route("/getcreaterjobs").get(isAuthenticated, isJobRecruiter, getCreaterJobs);

export default JobRouter;
