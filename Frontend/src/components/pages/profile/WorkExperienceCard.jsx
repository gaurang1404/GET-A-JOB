import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { PlusIcon, PlusCircle, Minus, X } from 'lucide-react'

const experiences = [
  {
    title: "Senior Software Engineer",
    company: "TechCorp Inc.",
    duration: "2018 - Present",
    responsibilities: [
      "Led development of microservices architecture",
      "Mentored junior developers and conducted code reviews",
      "Implemented CI/CD pipelines for faster deployments"
    ]
  },
  {
    title: "Software Engineer",
    company: "WebSolutions LLC",
    duration: "2015 - 2018",
    responsibilities: [
      "Developed and maintained multiple client-facing web applications",
      "Collaborated with UX designers to implement responsive designs",
      "Optimized database queries for improved performance"
    ]
  }
]

export const WorkExperienceCard = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [workExperience, setWorkExperience] = useState({
    position: '',
    company: '',
    startDate: '',
    endDate: '',
    isCurrentJob: false,
    additionalInfo: ['']
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setWorkExperience(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked) => {
    setWorkExperience(prev => ({
      ...prev,
      isCurrentJob: checked,
      endDate: checked ? '' : prev.endDate
    }))
  }

  const handleAdditionalInfoChange = (index, value) => {
    setWorkExperience(prev => {
      const newInfo = [...prev.additionalInfo]
      newInfo[index] = value
      return { ...prev, additionalInfo: newInfo }
    })
  }

  const addInfoField = () => {
    setWorkExperience(prev => ({
      ...prev,
      additionalInfo: [...prev.additionalInfo, '']
    }))
  }

  const removeInfoField = (index) => {
    setWorkExperience(prev => ({
      ...prev,
      additionalInfo: prev.additionalInfo.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submitted work experience:', workExperience)
    setIsOpen(false)
  }

  return (
    <Card className="rounded-md shadow-md mb-6">
      <CardHeader className="flex flex-row items-center gap-4 justify-between">
        <CardTitle>Work Experience</CardTitle>
        <div className="flex gap-2">

          {/* Edit Work Experience Dialog */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <PlusIcon className="mr-2" /> Add Experience
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Work Experience</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <InputField
                  id="position"
                  label="Job Position"
                  name="position"
                  value={workExperience.position}
                  onChange={handleChange}
                  required
                />
                <InputField
                  id="company"
                  label="Company Name"
                  name="company"
                  value={workExperience.company}
                  onChange={handleChange}
                  required
                />
                <InputField
                  id="startDate"
                  label="Start Date"
                  name="startDate"
                  value={workExperience.startDate}
                  onChange={handleChange}
                  type="date"
                  required
                />
                <InputField
                  id="endDate"
                  label="End Date"
                  name="endDate"
                  value={workExperience.endDate}
                  onChange={handleChange}
                  type="date"
                  disabled={workExperience.isCurrentJob}
                  required={!workExperience.isCurrentJob}
                />
                <CheckboxWithLabel
                  id="isCurrentJob"
                  label="I currently work here"
                  checked={workExperience.isCurrentJob}
                  onCheckedChange={handleCheckboxChange}
                />
                <AdditionalInfoFields
                  additionalInfo={workExperience.additionalInfo}
                  handleAdditionalInfoChange={handleAdditionalInfoChange}
                  addInfoField={addInfoField}
                  removeInfoField={removeInfoField}
                />
                <Button type="submit" className="w-full">Save Changes</Button>
              </form>
            </DialogContent>
          </Dialog>

          {/* Remove Work Experience Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Minus className="mr-2" /> Remove Experience
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Remove Work Experience</DialogTitle>
                <DialogDescription>
                  Select the work experience you want to remove.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {experiences.map((exp, i) => (
                  <div key={i} className="flex gap-2">
                    <Checkbox id={`experience-${i}`} />
                    <Label htmlFor={`experience-${i}`}>{exp.title}</Label>
                  </div>
                ))}
              </div>
              <DialogFooter>
                <Button type="submit" variant="destructive">Remove</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      {/* Display Work Experiences */}
      <CardContent>
        <div className="space-y-4">
          {experiences.map((experience, index) => (
            <WorkExperienceItem key={index} experience={experience} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Helper Components

const InputField = ({ id, label, ...props }) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} {...props} />
  </div>
)

const CheckboxWithLabel = ({ id, label, checked, onCheckedChange }) => (
  <div className="flex items-center space-x-2">
    <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
    <Label htmlFor={id}>{label}</Label>
  </div>
)

const AdditionalInfoFields = ({ additionalInfo, handleAdditionalInfoChange, addInfoField, removeInfoField }) => (
  <div className="space-y-2">
    <Label>Additional Information</Label>
    {additionalInfo.map((info, index) => (
      <div key={index} className="flex items-center space-x-2">
        <Input
          value={info}
          onChange={(e) => handleAdditionalInfoChange(index, e.target.value)}
          placeholder={`Additional info ${index + 1}`}
        />
        {index > 0 && (
          <Button variant="ghost" size="icon" onClick={() => removeInfoField(index)}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    ))}
    <Button type="button" variant="outline" size="sm" className="mt-2" onClick={addInfoField}>
      <PlusCircle className="h-4 w-4 mr-2" /> Add Information
    </Button>
  </div>
)

const WorkExperienceItem = ({ experience }) => (
  <div>
    <h3 className="font-semibold">{experience.title}</h3>
    <p className="text-sm text-muted-foreground">{experience.company} | {experience.duration}</p>
    <ul className="list-disc list-inside mt-2 text-sm">
      {experience.responsibilities.map((responsibility, idx) => (
        <li key={idx}>{responsibility}</li>
      ))}
    </ul>
  </div>
)
