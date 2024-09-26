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
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Job Seeker", "Job Recruiter"],
        required: true
    },
    location: {
        type: String,
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
        workExperience: [{
            title: {
                type: String,
                required: true,
            },
            company: {
                type: String,
                required: true,
            },
            startDate: {
                type: String,
                required: true
            },
            endDate: {
                type: String,
                required: true
            },
            responsibilities: {
                type: [String],
                required: true,
            }
        }],

        educationExperience: [{
            degree: {
                type: String,
                required: true,
            },
            institution: {
                type: String,
                required: true,
            },
            startYear: {
                type: String,
                required: true
            },
            endYear: {
                type: String,
                required: true
            },
        }],

        languages: [{
            name: {
                type: String,
                required: true,
            },
            proficiency: {
                type: String,
                enum: ['Native', 'Fluent', 'Intermediate', 'Basic'],
                required: true,
            }
        }],

        certifications: [{
            name: {
                type: String,
                required: true,
            },
            link: {
                type: String,
                default: ""
            }
        }],

        company: {
            type: mongoose.Schema.Types.ObjectId, ref: 'companies'
        },
        profilePicture: {
            type: String,
            default: ""
        }
    }
}, {timestamps: true})

export const User = mongoose.model("users", userSchema)