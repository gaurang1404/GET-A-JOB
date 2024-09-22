import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from 'dotenv'
import connectDb from "./utils/db.js"

dotenv.config({})

const server = express()

server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(cookieParser())

const corsOptions = {
    origin: "http//localhost:3001",
    credentials: true
}

server.use(cors(corsOptions))

const PORT  = process.env.PORT
server.listen(PORT || 1000, () => {
    connectDb()
    console.log("Server is listening at " + PORT)
})