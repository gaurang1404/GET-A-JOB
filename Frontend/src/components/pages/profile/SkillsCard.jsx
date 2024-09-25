import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { PlusIcon, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const initialSkills = ["React", "Node.js", "TypeScript", "Python", "AWS", "Docker", "GraphQL", "MongoDB"];

export const SkillsCard = () => {
  const [skills, setSkills] = useState(initialSkills);
  const [newSkill, setNewSkill] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [skillsToRemove, setSkillsToRemove] = useState(new Set());

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) {
      toast.error('Please enter a skill.');
      return;
    }

    // Check if the skill already exists
    if (skills.includes(newSkill)) {
      toast.error('This skill has already been added.');
      return;
    }

    setSkills((prev) => [...prev, newSkill]);
    setNewSkill('');
    setIsAddOpen(false);
  };

  const handleCheckboxChange = (skill) => {
    setSkillsToRemove((prev) => {
      const updated = new Set(prev);
      if (updated.has(skill)) {
        updated.delete(skill);
      } else {
        updated.add(skill);
      }
      return updated;
    });
  };

  const handleRemoveSkills = () => {
    setSkills((prev) => prev.filter(skill => !skillsToRemove.has(skill)));
    setSkillsToRemove(new Set());
    setIsRemoveOpen(false);
  };

  return (
    <Card className="rounded-md shadow-md mb-6">
      <CardHeader className="flex flex-row items-center gap-4 justify-between">
        <CardTitle>Skills</CardTitle>
        <div className="flex justify-start h-full gap-2 ">
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
                <Button type="button" onClick={handleAddSkill}>Save changes</Button>
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
                      onChange={() => handleCheckboxChange(skill)}
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
                <Button type="button" variant="destructive" onClick={handleRemoveSkills}>Remove</Button>
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
