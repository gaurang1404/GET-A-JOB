import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ["Seeker", "Recruiter"],
        required: true
    },
    profile: {
        bio: {
            type: String
        },
        skills: [{
            type: String,
        }],
        resume: {
            type: String
        },
        resumeTitle: {
            type: String
        },
        company: {
            type: mongoose.Schema.Types.ObjectId, ref: 'companies'
        },
        profilePicture: {
            type: String,
            default: ""
        }
    }
}, {timestamps: true})

export const users = mongoose.model("users", userSchema)