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

export const WorkExperienceCard = () => {
  const { loading, user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [newExperience, setNewExperience] = useState({ title: '', company: '', startDate: '', endDate: '', responsibilities: [''] });
  const [workExperience, setWorkExperience] = useState(user?.profile?.workExperience || []);

  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [experienceToRemove, setExperienceToRemove] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExperience(prev => ({ ...prev, [name]: value }));
  };

  const handleResponsibilitiesChange = (index, value) => {
    setNewExperience(prev => {
      const newResponsibilities = [...prev.responsibilities];
      newResponsibilities[index] = value;
      return { ...prev, responsibilities: newResponsibilities };
    });
  };

  const addResponsibilityField = () => {
    setNewExperience(prev => ({ ...prev, responsibilities: [...prev.responsibilities, ''] }));
  };

  const removeResponsibilityField = (index) => {
    setNewExperience(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index)
    }));
  };

  const handleAddExperience = async () => {
    try {
      dispatch(setLoading(true));

      if (!newExperience.title || !newExperience.company) {
        toast.error('Job title and company cannot be empty.');
        return;
      }

      const updatedWorkExperience = [...workExperience, newExperience];
      setWorkExperience(updatedWorkExperience);

      const data = { workData: updatedWorkExperience };

      const res = await axios.put(`${USER_API_ENDPOINT}/profile/update`, data, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      if (res.data.success) {
        navigate("/profile");
        toast.success('Work experience updated successfully!');
        dispatch(setUser(res.data.user));
      }

      
      setNewExperience({ title: '', company: '', startDate: '', endDate: '', responsibilities: [''] });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'An error occurred while updating.');
    } finally {
      setIsOpen(false);
      dispatch(setLoading(false));
    }
  };

  const handleRemoveExperience = (experience) => {
    setExperienceToRemove(experience);
    setConfirmOpen(true);
  };

  const confirmRemoveExperience = async () => {
    try {
      const updatedWorkExperience = workExperience.filter(experience => experience.title !== experienceToRemove.title);
      setWorkExperience(updatedWorkExperience);

      const data = { workData: updatedWorkExperience };

      const res = await axios.put(`${USER_API_ENDPOINT}/profile/update`, data, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      if (res.data.success) {
        toast.success('Work experience removed successfully!');
        dispatch(setUser(res.data.user));
      }

      setConfirmOpen(false);
      setExperienceToRemove(null);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'An error occurred while removing the experience.');
    }
  };

  return (
    <Card className="rounded-md shadow-md mb-6">
      <CardHeader className="flex flex-row items-center gap-4 justify-between">
        <CardTitle>Work Experience</CardTitle>
        <div className="flex gap-2">
          {/* Add Work Experience Dialog */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => setIsOpen(true)}>
                <PlusIcon className="mr-2" /> Add Experience
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Work Experience</DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <InputField
                  id="position"
                  label="Job Position"
                  name="title"
                  value={newExperience.title}
                  onChange={handleChange}
                  required
                />
                <InputField
                  id="company"
                  label="Company Name"
                  name="company"
                  value={newExperience.company}
                  onChange={handleChange}
                  required
                />
                <InputField
                  id="startDate"
                  label="Start Date"
                  name="startDate"
                  value={newExperience.startDate}
                  onChange={handleChange}
                  type="date"
                  required
                />
                <InputField
                  id="endDate"
                  label="End Date"
                  name="endDate"
                  value={newExperience.endDate}
                  onChange={handleChange}
                  type="date"
                />
                <AdditionalInfoFields
                  additionalInfo={newExperience.responsibilities}
                  handleAdditionalInfoChange={handleResponsibilitiesChange}
                  addInfoField={addResponsibilityField}
                  removeInfoField={removeResponsibilityField}
                />
                {
                  loading?
                  <Button className="w-full cursor-default"> <Loader2 className="animate-spin mr-4" /> Please wait </Button> :
                  <Button type="button" className="w-full" onClick={handleAddExperience}>
                    Save Experience
                  </Button>
                }
              </form>
            </DialogContent>
          </Dialog>

          {/* Confirmation Dialog for Removal */}
          <Dialog open={isConfirmOpen} onOpenChange={setConfirmOpen}>
            <DialogContent className="sm:max-w-[300px]">
              <DialogHeader>
                <DialogTitle>Confirm Removal</DialogTitle>
              </DialogHeader>
              <p>Are you sure you want to remove this work experience?</p>
              <div className="flex justify-end mt-4">
                <Button variant="outline" onClick={() => setConfirmOpen(false)} className="mr-2">
                  Cancel
                </Button>
                <Button variant="destructive" onClick={confirmRemoveExperience}>
                  Remove
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      {/* Display Work Experiences */}
      <CardContent>
        <div className="space-y-4">
          {workExperience.map((experience, index) => (
            <WorkExperienceItem key={index} experience={experience} onRemove={() => handleRemoveExperience(experience)} />
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

const AdditionalInfoFields = ({ additionalInfo, handleAdditionalInfoChange, addInfoField, removeInfoField }) => (
  <div className="space-y-2">
    <Label>Responsibilities</Label>
    {additionalInfo.map((info, index) => (
      <div key={index} className="flex items-center space-x-2">
        <Input
          value={info}
          onChange={(e) => handleAdditionalInfoChange(index, e.target.value)}
          placeholder={`Responsibility ${index + 1}`}
        />
        {index > 0 && (
          <Button variant="ghost" size="icon" onClick={() => removeInfoField(index)}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    ))}
    <Button type="button" variant="outline" size="sm" className="mt-2" onClick={addInfoField}>
      <PlusIcon className="h-4 w-4 mr-2" /> Add Responsibility
    </Button>
  </div>
);

const WorkExperienceItem = ({ experience, onRemove }) => (
  <div className="flex justify-between items-center">
    <div>
      <h3 className="font-semibold">{experience.title}</h3>
      <p className="text-sm text-muted-foreground">{experience.company} | {experience.startDate} - {experience.endDate}</p>
      <ul className="list-disc list-inside mt-2 text-sm">
        {experience.responsibilities.map((responsibility, idx) => (
          <li key={idx}>{responsibility}</li>
        ))}
      </ul>
    </div>
    <Button variant="ghost" size="icon" onClick={onRemove}>
      <X className="h-4 w-4" />
    </Button>
  </div>
);
