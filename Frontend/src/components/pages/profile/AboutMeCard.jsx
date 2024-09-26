import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Edit, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import axios from 'axios';
import { USER_API_ENDPOINT } from '@/utils/const';

export const AboutMeCard = () => {
  const { loading, user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [bio, setBio] = useState(user?.profile?.bio);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [newBio, setNewBio] = useState(bio);

  const handleSaveChanges = async () => {
    try{
      dispatch(setLoading(true))
      if (!newBio) {
        toast.error('Bio cannot be empty.');
        return;
      }
      const bioObj = {
        bio: newBio
      }

      const res = await axios.put(`${USER_API_ENDPOINT}/profile/update`, bioObj, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      if (res.data.success) {
        setBio(newBio.trim());
        navigate("/profile");
        toast.success('Bio updated successfully!');
        dispatch(setUser(res.data.user));
        setIsEditOpen(false);
      }
      
    }catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
    
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
          {
            !bio ? 
              <p>Add about me</p> :
              <p>{bio}</p>
          }
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
            {
              loading ? 
              <Button className="cursor-default"> <Loader2 className="animate-spin mr-4" /> Please wait</Button> :
              <Button type="button" onClick={handleSaveChanges}>Save changes</Button>
            }
          </DialogFooter>
        </DialogContent>
      </Card>
    </Dialog>
  );
};
