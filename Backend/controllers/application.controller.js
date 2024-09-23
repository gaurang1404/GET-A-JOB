import mongoose from "mongoose";
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyForJob = async (req, res) => {
    try{
        let jobId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({
                message: "Invalid Job ID format",
                success: false
            });
        }
        jobId = new mongoose.Types.ObjectId(jobId);

        const job = await Job.findOne({_id: jobId});
        if(!job){
            return res.status(400).json({
                message: "Job not found",
                success: false
            });
        }

        const alreadyApplied = await Application.findOne({appliedFor: jobId, appliedBy: req.id});
        if(alreadyApplied){
            return res.status(400).json({
                message: "Already registered for this job",
                success: false
            });
        }

        const application = await Application.create({
            appliedFor: jobId, 
            appliedBy: req.id,
            status: "Pending"
        });

        job.applications.push(application._id);
        await job.save();

        return res.status(200).json({
            message: "Applied for job successfully",
            application,
            success: true
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            messgae: "Somehing went wrong, please try again later!",
            success: false
        })
    }
}

export const getMyApplications = async (req, res) => {
    try{
        const userId = req.id;
        
        const applications = await Application
        .find({appliedBy: new mongoose.Types.ObjectId(userId)})
        .sort({createdOn: -1})
        .populate({
            path: "appliedFor",
            options: {sort: {createdAt: -1}},
            populate: {
                path: "companyOffering",
                options: {sort: {createdAt: -1}},
            }
        });

        if(!applications){
            return res.status(404).json({
                messgae: "You have not applied for any jobs",
                success: false
            })
        }
        
        return res.status(200).json({
            message: "Applications received successfully for current user",
            applications,
            success: true
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            messgae: "Somehing went wrong, please try again later!",
            success: false
        })
    }
}

export const getJobApplicants = async (req, res) =>{
    try{    
        const jobId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({
                message: "Invalid job ID format",
                success: false
            });
        }

        const job = await Job.findById(new mongoose.Types.ObjectId(jobId)).populate({
            path: "applications",
            options: {sort: {createdOn: -1}},
            populate: {
                path: "appliedBy"
            }
        });

        if(!job){
            return res.status(404).json({
                messgae: "Job not found",
                success: false
            })
        }

        return res.status(200).json({
            message: "Job found",
            job,
            success: true
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            messgae: "Somehing went wrong, please try again later!",
            success: false
        })
    }
}

export const updateStatus = async (req, res) => {
    try{
        const {status} = req.body;
        const applicationId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(applicationId)) {
            return res.status(400).json({
                message: "Invalid Application ID format",
                success: false
            });
        }

        const application = await Application.findOne({_id: applicationId});

        if(!application){
            return res.status(404).json({
                messgae: "Application not found",
                success: false
            })
        }

        application.status = status;
        await application.save();

        return res.status(200).json({
            message: "Application status updated successfully",
            application,
            success: true
        })

    }catch(error){
        console.log(error);
        if(error.name === "ValidationError"){
            return res.status(500).json({
                messgae: "Mongoose Schema violated",
                success: false
            })
        }
        return res.status(500).json({
            messgae: "Somehing went wrong, please try again later!",
            success: false
        })
    }
}