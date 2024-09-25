import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from '@/components/shared/Navbar'

// Mock data for job applications
const jobApplications = [
    {
        id: 1,
        company: "Tech Innovators Inc.",
        position: "Senior React Developer",
        appliedDate: "2023-09-15",
        status: "In Review",
        description: "Exciting opportunity to work on cutting-edge projects with a dynamic team.",
        requirements: "5+ years of React experience, strong TypeScript skills, experience with state management libraries.",
        salary: "$120,000 - $150,000",
        location: "Remote",
        contactPerson: "Jane Doe (HR Manager)",
        contactEmail: "jane.doe@techinnovators.com"
    },
    {
        id: 2,
        company: "Global Solutions Ltd.",
        position: "Full Stack Engineer",
        appliedDate: "2023-09-10",
        status: "Interview Scheduled",
        description: "Join our international team to develop scalable web applications for Fortune 500 clients.",
        requirements: "3+ years of full stack development, proficiency in React and Node.js, database design skills.",
        salary: "$90,000 - $120,000",
        location: "New York, NY",
        contactPerson: "John Smith (Tech Lead)",
        contactEmail: "john.smith@globalsolutions.com"
    },
    {
        id: 3,
        company: "StartUp Rocket",
        position: "Frontend Developer",
        appliedDate: "2023-09-05",
        status: "Application Received",
        description: "Be part of a fast-growing startup and help shape our product from the ground up.",
        requirements: "Strong JavaScript and React skills, experience with responsive design, passion for UX/UI.",
        salary: "$80,000 - $100,000",
        location: "San Francisco, CA",
        contactPerson: "Alice Johnson (CTO)",
        contactEmail: "alice.johnson@startuprocket.com"
    }
]

// Helper function to determine badge color based on status
const getStatusColor = (status) => {
    switch (status) {
        case "In Review":
            return "bg-yellow-500"
        case "Interview Scheduled":
            return "bg-green-500"
        case "Application Received":
            return "bg-blue-500"
        default:
            return "bg-gray-500"
    }
}

export const Applications = () => {
    const [expandedId, setExpandedId] = useState(null)

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id)
    }

    return (
        <div>
            <Navbar/>
            <div className="container mx-auto p-4 max-w-7xl my-10">
                <h1 className="text-3xl font-bold mb-6">My Job Applications</h1>
                <div className="space-y-4">
                    {jobApplications.map((job) => (
                        <Card key={job.id} className="w-full">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-2xl font-bold">{job.position}</CardTitle>
                                <Badge className={`${getStatusColor(job.status)} text-white`}>{job.status}</Badge>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    {job.company} • Applied on {job.appliedDate}
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center">
                                <Button
                                    variant="outline"
                                    onClick={() => toggleExpand(job.id)}
                                    className="flex items-center gap-2"
                                >
                                    {expandedId === job.id ? (
                                        <>Less Details <ChevronUp className="h-4 w-4" /></>
                                    ) : (
                                        <>More Details <ChevronDown className="h-4 w-4" /></>
                                    )}
                                </Button>
                            </CardFooter>
                            {expandedId === job.id && (
                                <CardContent className="border-t pt-4 mt-4">
                                    <h3 className="font-semibold mb-2">Job Description:</h3>
                                    <p className="mb-4">{job.description}</p>
                                    <h3 className="font-semibold mb-2">Requirements:</h3>
                                    <p className="mb-4">{job.requirements}</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="font-semibold">Salary Range:</h3>
                                            <p>{job.salary}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Location:</h3>
                                            <p>{job.location}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Contact Person:</h3>
                                            <p>{job.contactPerson}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Contact Email:</h3>
                                            <p>{job.contactEmail}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            )}
                        </Card>
                    ))}
                </div>
            </div>
        </div>

    )
}