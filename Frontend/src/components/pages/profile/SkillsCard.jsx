import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { PlusIcon, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import axios from 'axios';
import { USER_API_ENDPOINT } from '@/utils/const';

export const SkillsCard = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((store) => store.auth);

  const [skills, setSkills] = useState(user?.profile?.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [skillsToRemove, setSkillsToRemove] = useState([]);

  const handleAddSkill = async () => {
    try {
      dispatch(setLoading(true));

      if (!newSkill.trim()) {
        toast.error('Please enter a skill.');
        return;
      }

      // Check if the skill already exists
      if (skills.includes(newSkill)) {
        toast.error('This skill has already been added.');
        return;
      }

      const updatedSkills = [...skills, newSkill];
      setSkills(updatedSkills);
      
      const res = await axios.put(`${USER_API_ENDPOINT}/profile/update`, { skills: updatedSkills }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success('Skills updated successfully!');
      }

      setNewSkill('');
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'An error occurred while updating.');
    } finally {
      setIsAddOpen(false);
      dispatch(setLoading(false));
    }
  };

  const handleRemoveSkills = async () => {
    try {
      dispatch(setLoading(true));
      
      // Use array logic to filter out the selected skills
      const updatedSkills = skills.filter(skill => !skillsToRemove.includes(skill));
  
      // Make the API call with the updated skills array
      const res = await axios.put(`${USER_API_ENDPOINT}/profile/update`, { skills: updatedSkills }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
  
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success('Skills removed successfully!');
      }
  
      // Update the skills state and clear the skillsToRemove array after the operation
      setSkills(updatedSkills);
      setSkillsToRemove([]);  // Clear selected skills for removal
  
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'An error occurred while removing the skills.');
    } finally {
      setIsRemoveOpen(false);
      dispatch(setLoading(false));
    }
  };

  const handleCheckboxChange = (skill) => {
    setSkillsToRemove((prev) => {
      if (prev.includes(skill)) {
        return prev.filter((item) => item !== skill);  // Remove the skill
      } else {
        return [...prev, skill];  // Add the skill
      }
    });
  };

  return (
    <Card className="rounded-md shadow-md mb-6">
      <CardHeader className="flex flex-row items-center gap-4 justify-between">
        <CardTitle>Skills</CardTitle>
        <div className="flex justify-start h-full gap-2">
          {/* Add Skill Dialog */}
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <PlusIcon className="cursor-pointer rounded-full border border-black-950" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Skill</DialogTitle>
                <DialogDescription>
                  Enter a skill and press save
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  id="name"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="col-span-3"
                  placeholder="Enter a skill"
                />
              </div>
              <DialogFooter>
                {
                  loading ? 
                  <Button className="cursor-default">
                    Please wait...
                  </Button> :
                  <Button type="button" onClick={handleAddSkill}>Save changes</Button>
                }
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Remove Skill Dialog */}
          <Dialog open={isRemoveOpen} onOpenChange={setIsRemoveOpen}>
            <DialogTrigger asChild>
              <Minus className="cursor-pointer rounded-full border border-black-950" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Remove Skill</DialogTitle>
                <DialogDescription>
                  Select skills that you want to remove
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index} className="flex gap-2">
                    <Checkbox
                      id={`skill-${index}`}                      
                      onClick={() => handleCheckboxChange(skill)}
                    />
                    <label
                      htmlFor={`skill-${index}`}
                      className="text-md font-medium leading-none"
                    >
                      {skill}
                    </label>
                  </div>
                ))}
              </div>
              <DialogFooter>
                {
                  loading ?
                  <Button className="cursor-default">
                    Please wait...
                  </Button> :
                  <Button type="button" variant="destructive" onClick={handleRemoveSkills}>Remove</Button>
                }
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      {/* Display Skills List */}
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary">{skill}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
