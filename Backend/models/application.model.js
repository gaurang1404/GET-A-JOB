import mongoose from "mongoose"

const applicationSchema = mongoose.Schema({
    appliedFor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobs",
        required: true
    },
    appliedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending"
    }    
}, {timestamps: true})

export const Application = mongoose.model("applications", applicationSchema)