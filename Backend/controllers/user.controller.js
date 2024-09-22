import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const register = async (req, res) => {
    try{
        const {firstName, lastName, email, password, phone, role} = req.body;
        if(!firstName || !lastName || !email || !password || !phone || !role){
            return res.status(400).json({
                messgae: "Something is missing",
                success: false
            })
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                message: "User with this email already exists",
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        let user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone, 
            role
        })

        user = {
            firstName,
            lastName,
            email,
            phone, 
            role
        }

        return res.status(200).json({
            message: "User registered successfully",
            user,
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

export const logIn = async (req, res) => {
    try{
        const {email, password, role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                messgae: "Something is missing",
                success: false
            })
        }

        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message: "Invalid email",
                success: false
            })
        }

        const didPasswordMatch = await bcrypt.compare(password, user.password)

        if(!didPasswordMatch){
            return res.status(400).json({
                message: "Invalid password",
                success: false
            })
        }

        if(user.role !== role){
            return res.status(400).json({
                message: "Invalid role",
                success: false
            })
        }

        const tokenData = {
            userId: user._id,
            role
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {expiresIn: '15d'})

        user = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            profile: user.profile,
        }
        
        return res.status(200).cookie("token", token, {maxAge: 15*24*60*60*1000, httpOnly: true, sameSite: "strict"}).json({
            message: "User logged in successfully",
            user,
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

export const logOut = async (req, res) =>{
    try{    
        return res.status(200).cookie("token", "", {maxAge: 0}).json({
            message: "User logged out successfully",
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

export const updateProfile = async (req, res) => {
    try{
        
        const {firstName, lastName, phone, bio, skills, company} = req.body;
        const userId = req.id
        // const file = req.file

        if(!firstName || !lastName || !phone){
            return res.status(400).json({
                messgae: "Something is missing",
                success: false
            })
        };

        let user = await User.findOne({_id: userId})

        if(!user){
            return res.status(500).json({
                messgae: "Somehing went wrong, please try again later!",
                success: false
            })
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.phone = phone;
        user.profile.bio = bio;
        user.profile.skills = skills;
        user.profile.company = company;
        
        await user.save();
        
        user = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            profile: user.profile,
        }

        

        return res.status(200).json({
            message: "User profile updated successfully",
            user,
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