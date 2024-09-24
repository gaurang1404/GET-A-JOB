import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./utils/db.js";
import UserRouter from "./routes/user.routes.js";
import CompanyRouter from "./routes/company.routes.js";
import JobRouter from "./routes/job.routes.js";
import ApplicationRouter from "./routes/application.routes.js";

dotenv.config({});

const server = express();

server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
};

server.use(cors(corsOptions));

server.get("/", (req, res) => {
    res.send("Hello");
})

server.use("/api/v1/user", UserRouter);
server.use("/api/v1/company", CompanyRouter);
server.use("/api/v1/job", JobRouter);
server.use("/api/v1/application", ApplicationRouter);

server.use((req, res, next) => {
    res.status(404).json({
        message: "Route not found",
        success: false,
    });
});

server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Something went wrong",
        success: false,
    });
});

const PORT  = process.env.PORT;
server.listen(PORT || 1000, () => {
    connectDb()
    console.log("Server is listening at " + PORT)
})