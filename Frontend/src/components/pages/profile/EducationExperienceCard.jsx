import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { PlusIcon, Minus } from 'lucide-react';
import { Toast } from '../../ui/toast';
import { toast } from 'sonner';

const educationData = [
    {
        degree: "Master of Science in Computer Science",
        institution: "Stanford University",
        duration: "2013 - 2015"
    },
    {
        degree: "Bachelor of Science in Computer Engineering",
        institution: "University of California, Berkeley",
        duration: "2009 - 2013"
    }
];

export const EducationExperienceCard = () => {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isRemoveOpen, setIsRemoveOpen] = useState(false);
    const [educationList, setEducationList] = useState(educationData);
    const [newEducation, setNewEducation] = useState({
        degree: '',
        institution: '',
        startYear: '',
        endYear: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEducation(prev => ({ ...prev, [name]: value }));
    };

    const handleAddEducation = (e) => {
        e.preventDefault();
        const startYear = parseInt(newEducation.startYear);
        const endYear = parseInt(newEducation.endYear);

        // Basic validation
        if (isNaN(startYear) || isNaN(endYear) || startYear > endYear) {
            toast({
                title: 'Invalid Year Input',
                description: 'Please ensure the years are valid and the end year is greater than or equal to the start year.',
                variant: 'destructive'
            });
            return;
        }

        setEducationList(prev => [...prev, {
            degree: newEducation.degree,
            institution: newEducation.institution,
            duration: `${newEducation.startYear} - ${newEducation.endYear}`
        }]);
        setNewEducation({ degree: '', institution: '', startYear: '', endYear: '' });
        setIsAddOpen(false);
    };

    const handleRemoveEducation = (degreeToRemove) => {
        setEducationList(prev => prev.filter(edu => edu.degree !== degreeToRemove));
        setIsRemoveOpen(false);
    };

    return (
        <Card className="rounded-md shadow-md">
            <CardHeader className="flex flex-row items-center gap-4 justify-between">
                <CardTitle>Education</CardTitle>
                <div className="flex justify-start h-full gap-2">

                    {/* Add Education Dialog */}
                    <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <PlusIcon className="mr-2" /> Add Education
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add Education</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleAddEducation} className="space-y-4">
                                <InputField
                                    id="degree"
                                    label="Degree"
                                    value={newEducation.degree}
                                    onChange={handleInputChange}
                                    required
                                    name="degree"
                                />
                                <InputField
                                    id="institution"
                                    label="Institution"
                                    value={newEducation.institution}
                                    onChange={handleInputChange}
                                    required
                                    name="institution"
                                />
                                <YearSelection
                                    startYear={newEducation.startYear}
                                    endYear={newEducation.endYear}
                                    onStartYearChange={handleInputChange}
                                    onEndYearChange={handleInputChange}
                                />
                                <Button type="submit" className="w-full">Add Education</Button>
                            </form>
                        </DialogContent>
                    </Dialog>

                    {/* Remove Education Dialog */}
                    <Dialog open={isRemoveOpen} onOpenChange={setIsRemoveOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <PlusIcon className="mr-2" /> Remove Education
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Remove Education</DialogTitle>
                                <DialogDescription>
                                    Select the education detail you want to remove.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                                {educationList.map((edu, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Checkbox
                                            id={`education-${index}`}
                                            onChange={() => handleRemoveEducation(edu.degree)}
                                        />
                                        <Label htmlFor={`education-${index}`}>{edu.degree} - {edu.institution}</Label>
                                    </div>
                                ))}
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="destructive" onClick={() => setIsRemoveOpen(false)}>Remove</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>

            {/* Display Education List */}
            <CardContent>
                <div className="space-y-4">
                    {educationList.map((edu, index) => (
                        <div key={index}>
                            <h3 className="font-semibold">{edu.degree}</h3>
                            <p className="text-sm text-muted-foreground">
                                {edu.institution} | {edu.duration}
                            </p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

// Helper Component for Input Field
const InputField = ({ id, label, ...props }) => (
    <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Input id={id} {...props} />
    </div>
);

// Year Selection Component
const YearSelection = ({ startYear, endYear, onStartYearChange, onEndYearChange }) => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

    return (
        <div className="flex space-x-4">
            <div className="space-y-2 w-1/2">
                <Label htmlFor="startYear">Start Year</Label>
                <select
                    id="startYear"
                    name="startYear"
                    value={startYear}
                    onChange={onStartYearChange}
                    className="border rounded-md p-2 w-full"
                    required
                >
                    <option value="">Select Start Year</option>
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
            <div className="space-y-2 w-1/2">
                <Label htmlFor="endYear">End Year</Label>
                <select
                    id="endYear"
                    name="endYear"
                    value={endYear}
                    onChange={onEndYearChange}
                    className="border rounded-md p-2 w-full"
                    required
                >
                    <option value="">Select End Year</option>
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};
