const isJobRecruiter = async (req, res, next) => {
    if(req.role !== "Job Recruiter"){
        return res.status(400).json({
            message: "Job Seeker cannot make creater requests",
            success: false
        })
    }
    next();
}

export default isJobRecruiter;