import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, ChevronRight, Briefcase, Building, DollarSign, MapPin } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Navbar } from '../../shared/Navbar'


export const ApplicationPage = () => {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        experience: '',
        coverLetter: '',
        resume: ""
    })

    const { toast } = useToast()

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        toast({
            title: "Application Submitted Successfully",
            description: "We've received your application and will be in touch soon.",
        })
    }

    const nextStep = () => setStep(prev => Math.min(prev + 1, 3))
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl container mx-auto py-10 px-4 md:px-0 min-h-7xl">
                <Card className="w-full max-w-5xl mx-auto rounded-md shadow-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold">Senior Software Engineer</CardTitle>
                        <CardDescription className="text-lg">Join our innovative team at TechCorp</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-8">
                            <Progress value={(step / 3) * 100} className="w-full" />
                        </div>

                        {step === 1 && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex items-center space-x-4">
                                        <Briefcase className="w-6 h-6 text-primary" />
                                        <div>
                                            <h3 className="font-semibold">Job Type</h3>
                                            <p className="text-sm text-gray-600">Full-time</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <Building className="w-6 h-6 text-primary" />
                                        <div>
                                            <h3 className="font-semibold">Department</h3>
                                            <p className="text-sm text-gray-600">Engineering</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <DollarSign className="w-6 h-6 text-primary" />
                                        <div>
                                            <h3 className="font-semibold">Salary Range</h3>
                                            <p className="text-sm text-gray-600">$120,000 - $180,000</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <MapPin className="w-6 h-6 text-primary" />
                                        <div>
                                            <h3 className="font-semibold">Location</h3>
                                            <p className="text-sm text-gray-600">Remote (US-based)</p>
                                        </div>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold">Job Description</h3>
                                    <p className="text-sm text-gray-600">
                                        We are seeking a talented Senior Software Engineer to join our innovative team.
                                        The ideal candidate will have strong problem-solving skills, experience with modern
                                        web technologies, and a passion for building scalable, high-performance applications.
                                    </p>
                                    <h4 className="font-semibold">Key Responsibilities:</h4>
                                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                                        <li>Design and implement new features for our core product</li>
                                        <li>Optimize application performance and scalability</li>
                                        <li>Collaborate with cross-functional teams to define and implement new product features</li>
                                        <li>Mentor junior developers and contribute to the team's technical growth</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First name</Label>
                                        <Input
                                            id="firstName"
                                            placeholder="Enter your first name"
                                            value={formData.firstName}
                                            onChange={(e) => updateFormData('firstName', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last name</Label>
                                        <Input
                                            id="lastName"
                                            placeholder="Enter your last name"
                                            value={formData.lastName}
                                            onChange={(e) => updateFormData('lastName', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={(e) => updateFormData('email', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone number</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        value={formData.phone}
                                        onChange={(e) => updateFormData('phone', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="experience">Years of experience</Label>
                                    <Input
                                        id="experience"
                                        type="number"
                                        placeholder="Enter years of experience"
                                        value={formData.experience}
                                        onChange={(e) => updateFormData('experience', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="coverLetter">Cover Letter</Label>
                                    <Textarea
                                        id="coverLetter"
                                        placeholder="Tell us why you're interested in this position"
                                        value={formData.coverLetter}
                                        onChange={(e) => updateFormData('coverLetter', e.target.value)}
                                        className="min-h-[200px]"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="resume">Resume</Label>
                                    <Input
                                        id="resume"
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={(e) => updateFormData('resume', e.target.files?.[0] || null)}
                                        required
                                    />
                                    <p className="text-sm text-gray-500">Upload your resume (PDF, DOC, or DOCX)</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        {step > 1 && (
                            <Button onClick={prevStep} variant="outline">
                                <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                            </Button>
                        )}
                        {step < 3 ? (
                            <Button onClick={nextStep} className="ml-auto">
                                Next <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        ) : (
                            <Button onClick={handleSubmit} className="ml-auto">Submit Application</Button>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </div>

    )
}