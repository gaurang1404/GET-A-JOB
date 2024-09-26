import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card"
import { Badge } from "../../ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"
import { Mail, Phone, MapPin, Edit, PlusIcon, Minus, PlusCircle, X } from "lucide-react"
import { Navbar } from "../../shared/Navbar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Checkbox } from "../../ui/checkbox";
import { WorkExperienceCard } from "./WorkExperienceCard";
import { EducationExperienceCard } from "./EducationExperienceCard";
import { LanguagesCard } from "./LanguagesCard";
import { CertificationsCard } from "./CertificationsCard";
import { SkillsCard } from "./SkillsCard";
import { AboutMeCard } from "./AboutMeCard";
import { ProfileCard } from "./ProfileCard";

export const UserProfile = () => {  
  
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl container mx-auto p-4 my-10">
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="g md:col-span-2">
            <ProfileCard/>
            <AboutMeCard/>
            <SkillsCard/>
            <WorkExperienceCard/>
            <EducationExperienceCard/>
          </div>
          <div>
            <LanguagesCard/>
            <CertificationsCard/>
            <div className="flex flex-col gap-2">        
              <Button className="bg-[white] border border-black text-[black] w-full hover:bg-[#faf5e4] hover:text-[#004445]">Upload New Resume</Button>
              <Button className="bg-[white] border border-black text-[black] w-full hover:bg-[#faf5e4] hover:text-[#004445]">Download Resume</Button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}