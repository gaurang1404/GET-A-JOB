import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export const AboutMeCard = () => {
  const [bio, setBio] = useState(
    "Passionate software engineer with 8+ years of experience in developing scalable web applications. Skilled in React, Node.js, and cloud technologies. Always eager to learn and tackle new challenges."
  );
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [newBio, setNewBio] = useState(bio);

  const handleSaveChanges = () => {
    if (!newBio.trim()) {
      toast.error('Bio cannot be empty.');
      return;
    }

    setBio(newBio);
    setIsEditOpen(false);
    toast.success('Bio updated successfully!');
  };

  return (
    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
      <Card className="rounded-md shadow-md mb-6">
        <CardHeader className="flex flex-row items-center gap-4 justify-between">
          <CardTitle>About Me</CardTitle>
          <DialogTrigger>
            <div className="flex flex-col justify-start h-full cursor-pointer">
              <Edit />
            </div>
          </DialogTrigger>
        </CardHeader>
        <CardContent>
          <p>{bio}</p>
        </CardContent>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit About Me</DialogTitle>
            <DialogDescription>
              Make changes to your bio here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="">
              <Textarea
                id="Bio"
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
                placeholder="Tell something about yourself"
                className="w-full min-h-[200px] max-h-[300px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSaveChanges}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Card>
    </Dialog>
  );
};
