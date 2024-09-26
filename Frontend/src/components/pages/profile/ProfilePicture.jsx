import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";
import axios from "axios";
import { setUser } from "@/redux/authSlice"; // Assuming you have an action to update the user state
import { USER_API_ENDPOINT } from "@/utils/const";

export default function ProfilePicture() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=100&width=100");
  const [newImage, setNewImage] = useState(null);

  // Load the user's current profile picture from global state
  useEffect(() => {
    if (user?.profile?.profilePicture) {
      setProfileImage(user.profile.profilePicture);
    }
  }, [user]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  const handleUpdateImage = async () => {
    if (newImage) {
      const formData = new FormData();
      formData.append("profilePicture", newImage); // Make sure this matches the Multer config
  
      try {
        const response = await axios.post(`${USER_API_ENDPOINT}/profile-picture/update`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        const updatedUser = response.data;
        dispatch(setUser(updatedUser)); // Update the global user state
        setProfileImage(updatedUser.profile.profilePicture); // Set the new profile picture
        setNewImage(null);
      } catch (error) {
        console.error("Error updating profile picture:", error.response || error);
      }
    }
  };
  

  const handleRemoveImage = async () => {
    try {
      const response = await axios.post(`${USER_API_ENDPOINT}/profile-picture/update`, {
        profilePicture: "/placeholder.svg?height=100&width=100", // Reset to default
      });

      const updatedUser = response.data;
      dispatch(setUser(updatedUser)); // Update global user state
      setProfileImage("/placeholder.svg?height=100&width=100"); // Reset profile picture in UI
    } catch (error) {
      console.error("Error removing profile picture:", error);
    }
  };

  return (
    <div className="flex flex-col items-center -ml-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="relative rounded-full hover:opacity-80">
            <Avatar className="h-24 w-24">
              <AvatarImage className="object-cover" src={profileImage} alt="Profile picture" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 rounded-full bg-primary p-2">
              <Camera className="h-5 w-5 text-primary-foreground" />
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Profile Picture</DialogTitle>
            <DialogDescription>
              Choose a new profile picture, upload one from your device, or remove your current picture.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-center">
              <Avatar className="h-40 w-40">
                <AvatarImage className="object-cover" src={newImage ? URL.createObjectURL(newImage) : profileImage} alt="New profile picture" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col space-y-2">
              <Label htmlFor="picture" className="text-left">
                Upload a new picture
              </Label>
              <Input id="picture" type="file" accept="image/*" onChange={handleImageChange} />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleUpdateImage} disabled={!newImage}>
              Update Picture
            </Button>
            <Button variant="destructive" onClick={handleRemoveImage}>
              Remove Picture
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
