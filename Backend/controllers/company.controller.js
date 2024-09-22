import mongoose from "mongoose";
import { Company } from "../models/company.model.js";

export const register = async (req, res) => {
    try{
        const {name, description, location} = req.body;
        if(!name || !description || !location){
            return res.status(400).json({
                messgae: "Something is missing",
                success: false
            })
        }

        const existingCompany = await Company.findOne({name});
        if(existingCompany){
            return res.status(400).json({
                message: "Company with this name already exists",
                success: false
            })
        }

        const foundedBy = req.id;

        let company = await Company.create({
            name, 
            description, 
            location, 
            foundedBy
        })

        return res.status(200).json({
            message: "Company registered successfully",
            company,
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

export const getCompany = async (req, res) => {
    try{
        const userId = req.id;        

        const companies = await Company.find({foundedBy: userId})

        if(!companies){
            return res.status(404).json({
                message: "Current user has not founded any companies",
                success: false
            })
        }

        return res.status(200).json({
            message: "Companies received successfully",
            companies,
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

export const getCompanyById = async (req, res) => {
    try {    
        const companyId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(companyId)) {
            return res.status(400).json({
                message: "Invalid company ID format",
                success: false
            });
        }

        const id = new mongoose.Types.ObjectId(companyId);
        const company = await Company.findOne({ _id: id });

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company received successfully",
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong, please try again later!",
            success: false
        });
    }
};

export const updateProfile = async (req, res) => {
    try{        
        const {description, location} = req.body;
        const companyId = req.params;

        if (!mongoose.Types.ObjectId.isValid(companyId)) {
            return res.status(400).json({
                message: "Invalid company ID format",
                success: false
            });
        }

        if(!description || !location){
            return res.status(400).json({
                messgae: "Something is missing",
                success: false
            })
        };

        const id = new mongoose.Types.ObjectId(companyId);
        let company = await Company.findOne({_id: id});

        if(!company){
            return res.status(404).json({
                messgae: "Invalid company id",
                success: false
            })
        }

        company.name = company.name;
        company.description = description;
        company.location = location;
        company.logo = company.logo;
        
        await company.save();

        return res.status(200).json({
            message: "Company profile updated successfully",
            company,
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