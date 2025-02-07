import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone, role, location } = req.body;
        if (!firstName || !lastName || !email || !password || !phone || !role || !location) {

            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
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
            role,
            location
        })

        user = {
            firstName,
            lastName,
            email,
            phone,
            role,
            location
        }

        return res.status(200).json({
            message: "Signed up successfully",
            user,
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Somehing went wrong, please try again later!",
            success: false
        })
    }
}

export const logIn = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }

        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "Invalid email",
                success: false
            })
        }

        const didPasswordMatch = await bcrypt.compare(password, user.password)

        if (!didPasswordMatch) {
            return res.status(400).json({
                message: "Invalid password",
                success: false
            })
        }

        if (user.role !== role) {
            return res.status(400).json({
                message: "Invalid role",
                success: false
            })
        }

        const tokenData = {
            userId: user._id,
            role
        }

        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '15d' })

        user = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            profile: user.profile,
            location: user.location
        }


        return res.status(200).cookie("token", token, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" }).json({
            message: "User logged in successfully",
            user,
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Somehing went wrong, please try again later!",
            success: false
        })
    }
}

export const logOut = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "User logged out successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Somehing went wrong, please try again later!",
            success: false
        })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, bio, skills, workData, educationExperience, languages, certifications, company } = req.body;
        const userId = req.id

        let user = await User.findOne({ _id: userId })

        if (!user) {
            return res.status(500).json({
                message: "Somehing went wrong, please try again later!",
                success: false
            })
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.profile.bio = bio || user.profile.bio;
        user.profile.skills = skills || user.profile.skills;
        user.profile.workExperience = workData || user.profile.workExperience;
        user.profile.educationExperience = educationExperience || user.profile.educationExperience;
        user.profile.languages = languages || user.profile.languages;
        user.profile.certifications = certifications || user.profile.certifications;
        user.profile.company = company || user.profile.company;

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


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Somehing went wrong, please try again later!",
            success: false
        })
    }
}

export const updateProfilePicture = async (req, res) => {
    try {
        console.log(req);
        console.log(req.file);
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }
        const userId = req.id

        let user = await User.findOne({ _id: userId })

        if (!user) {
            return res.status(500).json({
                message: "Somehing went wrong, please try again later!",
                success: false
            })
        }

        user.profile.profilePicture = req.file;

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
            message: 'File uploaded successfully',
            success: true,
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Somehing went wrong, please try again later!",
            success: false
        })
    }
};