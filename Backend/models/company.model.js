import mongoose from "mongoose"

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true
    },
    foundedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }    
}, {timestamps: true})

export const Company = mongoose.model("companies", companySchema)