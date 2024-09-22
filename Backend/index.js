import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from 'dotenv'
import connectDb from "./utils/db.js"
import UserRouter from "./routes/user.routes.js"
import CompanyRouter from "./routes/company.routes.js"

dotenv.config({});

const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(cookieParser());

const corsOptions = {
    origin: "http//localhost:3001",
    credentials: true
};

server.use(cors(corsOptions));

server.get("/", (req, res) => {
    res.send("Hello");
})

server.use("/api/v1/user", UserRouter);
server.use("/api/v1/company", CompanyRouter);

const PORT  = process.env.PORT;
server.listen(PORT || 1000, () => {
    connectDb()
    console.log("Server is listening at " + PORT)
})