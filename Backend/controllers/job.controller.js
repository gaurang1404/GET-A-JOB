import mongoose from "mongoose";
import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";

export const createJob = async (req, res) => {
    try{
        const {title, description, requirements, salary, yearsOfExperience, location, jobType, posts, companyOffering} = req.body;
        if(!title || !description || !requirements || !salary || !yearsOfExperience || !location || !jobType || !posts || !companyOffering){
            return res.status(400).json({
                messgae: "Something is missing",
                success: false
            })
        }

        

        if (!mongoose.Types.ObjectId.isValid(companyOffering)) {
            return res.status(400).json({
                message: "Invalid company ID format",
                success: false
            });
        }

        const isValidCompany = await Company.findOne({_id: new mongoose.Types.ObjectId(companyOffering)});
        if(!isValidCompany){
            return res.status(400).json({
                message: "Company not found",
                success: false
            });
        }

        const offeredBy = req.id;

        const job = await Job.create({
            title, 
            description, 
            requirements, 
            salary, 
            yearsOfExperience,
            location, 
            jobType, 
            posts, 
            companyOffering,
            offeredBy
        });

        return res.status(200).json({
            message: "Job created successfully",
            job,
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

export const getAllJobs = async (req, res) => {
    try{
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                {title: {$regex: keyword, $options: "i"}},
                {description: {$regex: keyword, $options: "i"}}
            ]
        };

        const jobs = await Job.find(query).populate({path: "companyOffering"}).sort({createdAt: -1});

        if(!jobs){
            return res.status(404).json({
                messgae: "Jobs not found",
                success: false
            })
        }
        
        return res.status(200).json({
            message: "Jobs found",
            jobs,
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

export const getJobById = async (req, res) =>{
    try{    
        const jobId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({
                message: "Invalid job ID format",
                success: false
            });
        }

        const job = await Job.findById(new mongoose.Types.ObjectId(jobId)).populate({path: "companyOffering"});
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

export const getCreaterJobs = async (req, res) => {
    try{
        const userId = req.id
        const jobs = await Job.find({offeredBy: userId});
        if(!jobs){
            return res.status(404).json({
                messgae: "Jobs not found for current user",
                success: false
            })
        }

        return res.status(200).json({
            message: "Jobs found for current user",
            jobs,
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