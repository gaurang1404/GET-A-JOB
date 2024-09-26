import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, PlusIcon, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoading, setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_ENDPOINT } from '@/utils/const';

export const EducationExperienceCard = () => {
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isRemoveOpen, setIsRemoveOpen] = useState(false);
    const [educationList, setEducationList] = useState(user?.profile?.educationExperience || []);
    const [newEducation, setNewEducation] = useState({
        degree: '',
        institution: '',
        startYear: '',
        endYear: ''
    });

    const [educationToRemove, setEducationToRemove] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEducation(prev => ({ ...prev, [name]: value }));
    };

    const handleAddEducation = async () => {
        try {
            dispatch(setLoading(true));

            if (!newEducation.degree || !newEducation.institution) {
                toast.error('Degree and institution cannot be empty.');
                return;
            }

            const updatedEducationList = [...educationList, {
                degree: newEducation.degree,
                institution: newEducation.institution,
                startYear: newEducation.startYear,
                endYear: newEducation.endYear,
            }];

            setEducationList(updatedEducationList);

            const data = { educationExperience: updatedEducationList };

            const res = await axios.put(`${USER_API_ENDPOINT}/profile/update`, data, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success('Education details updated successfully!');
                navigate("/profile");
            }

            setNewEducation({ degree: '', institution: '', startYear: '', endYear: '' });
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'An error occurred while updating.');
        } finally {
            setIsAddOpen(false);
            dispatch(setLoading(false));
        }
    };


    const handleRemoveEducation = (education) => {
        setEducationToRemove(education);
        setIsRemoveOpen(true);
    };

    const confirmRemoveEducation = async () => {
        try {
            const updatedEducationList = educationList.filter(edu => edu.degree !== educationToRemove.degree);
            setEducationList(updatedEducationList);

            const data = { educationExperience: updatedEducationList };

            const res = await axios.put(`${USER_API_ENDPOINT}/profile/update`, data, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success('Education details removed successfully!');
                dispatch(setUser(res.data.user));
            }

            setIsRemoveOpen(false);
            setEducationToRemove(null);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'An error occurred while removing the education detail.');
        }
    };

    return (
        <Card className="rounded-md shadow-md mb-6">
            <CardHeader className="flex flex-row items-center gap-4 justify-between">
                <CardTitle>Education</CardTitle>
                <div className="flex gap-2">
                    {/* Add Education Dialog */}
                    <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" onClick={() => setIsAddOpen(true)}>
                                <PlusIcon className="mr-2" /> Add Education
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add Education</DialogTitle>
                            </DialogHeader>
                            {/* Replaced form tag with div */}
                            <div className="space-y-4">
                                <InputField
                                    id="degree"
                                    label="Degree"
                                    name="degree"
                                    value={newEducation.degree}
                                    onChange={handleInputChange}
                                    required
                                />
                                <InputField
                                    id="institution"
                                    label="Institution"
                                    name="institution"
                                    value={newEducation.institution}
                                    onChange={handleInputChange}
                                    required
                                />
                                <InputField
                                    id="startYear"
                                    label="Start Year"
                                    name="startYear"
                                    value={newEducation.startYear}
                                    onChange={handleInputChange}
                                    type="number"
                                    required
                                />
                                <InputField
                                    id="endYear"
                                    label="End Year"
                                    name="endYear"
                                    value={newEducation.endYear}
                                    onChange={handleInputChange}
                                    type="number"
                                />
                                {/* Button triggers handleAddEducation without refreshing the page */}
                                {
                                    loading ?
                                        <Button className="w-full cursor-default">
                                            <Loader2 className="animate-spin mr-4" /> Please wait
                                        </Button> :
                                        <Button type="button" className="w-full" onClick={handleAddEducation}>
                                            Save Education
                                        </Button>
                                }
                            </div>
                        </DialogContent>
                    </Dialog>


                    {/* Confirmation Dialog for Removal */}
                    <Dialog open={isRemoveOpen} onOpenChange={setIsRemoveOpen}>
                        <DialogContent className="sm:max-w-[300px]">
                            <DialogHeader>
                                <DialogTitle>Confirm Removal</DialogTitle>
                            </DialogHeader>
                            <p>Are you sure you want to remove this education detail?</p>
                            <div className="flex justify-end mt-4">
                                <Button variant="outline" onClick={() => setIsRemoveOpen(false)} className="mr-2">
                                    Cancel
                                </Button>
                                {
                                    loading ?
                                        <Button className="cursor-default"> <Loader2 className="animate-spin mr-4" /> Please wait </Button> :
                                        <Button variant="destructive" onClick={confirmRemoveEducation}>
                                            Remove
                                        </Button>
                                }
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardHeader>

            {/* Display Education List */}
            <CardContent>
                <div className="space-y-4">
                    {educationList.map((education, index) => (
                        <EducationItem key={index} education={education} onRemove={() => handleRemoveEducation(education)} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

// Helper Components
const InputField = ({ id, label, ...props }) => (
    <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Input id={id} {...props} />
    </div>
);

const EducationItem = ({ education, onRemove }) => (
    <div className="flex justify-between items-center">
        <div>
            <h3 className="font-semibold">{education.degree}</h3>
            <p className="text-sm text-muted-foreground">{education.institution} | {education.startYear} - {education.endYear}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onRemove}>
            <X className="h-4 w-4" />
        </Button>
    </div>
);
