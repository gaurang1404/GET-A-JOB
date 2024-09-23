import mongoose from "mongoose"

const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: [{
        type: String,
        required: true,
    }],
    salary: {
        type: Number,
        required: true
    },
    yearsOfExperience: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    posts: {
        type: Number,
        required: true
    },
    companyOffering: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "companies",
        required: true,        
    },
    offeredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "applications",
    }]
    
}, {timestamps: true})

export const Job = mongoose.model("jobs", jobSchema)