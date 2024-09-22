import mongoose from "mongoose"

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_STRING)
        console.log("MongoDb server connected")
    }catch(error){
        console.log(error)
    }
}

export default connectDb