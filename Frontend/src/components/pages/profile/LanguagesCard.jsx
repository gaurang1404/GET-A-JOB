import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { PlusIcon, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import axios from 'axios';
import { USER_API_ENDPOINT } from '@/utils/const';

// Enum for fluency levels
const FluencyLevels = {
  NATIVE: 'Native',
  FLUENT: 'Fluent',
  INTERMEDIATE: 'Intermediate',
  BASIC: 'Basic',
};

// Available languages
const availableLanguages = [
  'English',
  'Spanish',
  'French',
  'German',
  'Chinese',
  'Japanese',
  'Russian',
  'Arabic',
];

export const LanguagesCard = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((store) => store.auth);
  const [languagesList, setLanguagesList] = useState(user?.profile?.languages || []);
  const [newLanguage, setNewLanguage] = useState({ name: '', proficiency: '' });
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [languagesToRemove, setLanguagesToRemove] = useState(new Set());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLanguage(prev => ({ ...prev, [name]: value }));
  };

  const handleAddLanguage = async (e) => {
    e.preventDefault();
    if (!newLanguage.name || !newLanguage.proficiency) {
      toast.error('Please fill in both fields.');
      return;
    }

    // Check if the language already exists
    if (languagesList.some(lang => lang.name === newLanguage.name)) {
      toast.error('This language has already been added.');
      return;
    }

    // Update the languages state
    const updatedLanguages = [...languagesList, { ...newLanguage }];

    try {
      dispatch(setLoading(true));

      const res = await axios.put(`${USER_API_ENDPOINT}/profile/update`, { languages: updatedLanguages }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success('Language added successfully!');
        setLanguagesList(updatedLanguages); // Update local state
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'An error occurred while adding the language.');
    } finally {
      setIsAddOpen(false);
      dispatch(setLoading(false));
    }

    setNewLanguage({ name: '', proficiency: '' });
  };

  const handleCheckboxChange = (name) => {
    setLanguagesToRemove(prev => {
      const updated = new Set(prev);
      if (updated.has(name)) {
        updated.delete(name); // Remove if already selected
      } else {
        updated.add(name); // Add if not selected
      }
      return updated;
    });
  };

  const handleRemoveLanguage = async () => {
    if(!languagesToRemove || languagesToRemove.size == 0){
      return;
    }
    const updatedLanguages = languagesList.filter(lang => !languagesToRemove.has(lang.name));
    
    try {
      dispatch(setLoading(true));

      const res = await axios.put(`${USER_API_ENDPOINT}/profile/update`, { languages: updatedLanguages }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success('Language removed successfully!');
        setLanguagesList(updatedLanguages); // Update local state
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'An error occurred while removing the language.');
    } finally {
      setLanguagesToRemove(new Set()); // Clear selected languages
      setIsRemoveOpen(false);
      dispatch(setLoading(false));
    }
  };

  return (
    <Card className="rounded-md shadow-md mb-6">
      <CardHeader className="flex flex-row items-center gap-4 justify-between">
        <CardTitle>Languages</CardTitle>
        <div className="flex justify-start h-full gap-2">
          {/* Add Language Dialog */}
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <PlusIcon className="cursor-pointer rounded-full border border-black-950" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Language</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddLanguage} className="space-y-4">
                <Label htmlFor="language">Language</Label>
                <select
                  id="language"
                  name="name"
                  value={newLanguage.name}
                  onChange={handleInputChange}
                  className="border rounded-md p-2 w-full"
                  required
                >
                  <option value="">Select Language</option>
                  {availableLanguages.map(language => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </select>

                <Label htmlFor="proficiency">Proficiency</Label>
                <select
                  id="proficiency"
                  name="proficiency"
                  value={newLanguage.proficiency}
                  onChange={handleInputChange}
                  className="border rounded-md p-2 w-full"
                  required
                >
                  <option value="">Select Proficiency</option>
                  {Object.values(FluencyLevels).map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>

                <Button type="submit" className="w-full">Add Language</Button>
              </form>
            </DialogContent>
          </Dialog>

          {/* Remove Language Dialog */}
          <Dialog open={isRemoveOpen} onOpenChange={setIsRemoveOpen}>
            <DialogTrigger asChild>
              <Minus className="cursor-pointer rounded-full border border-black-950" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Remove Language</DialogTitle>
                <DialogDescription>
                  Select the languages you want to remove.
                </DialogDescription>
              </DialogHeader>
              
              {languagesList.map((lang, index) => (
                <div key={index} className="flex gap-2">
                  <Checkbox
                    id={`language-${index}`}                  
                    onClick={() => handleCheckboxChange(lang.name)} // Call handler on click
                  />
                  <Label htmlFor={`language-${index}`}>{lang.name} - {lang.proficiency}</Label>
                </div>
              ))}
              
              <DialogFooter>
                <Button type="button" onClick={() => setIsRemoveOpen(false)}>Cancel</Button>
                <Button type="button" onClick={handleRemoveLanguage} variant="destructive">Remove</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      {/* Display Languages List */}
      <CardContent>
        <div className="space-y-4">
          {languagesList.map((lang, index) => (
            <div key={index}>
              <h3 className="font-semibold">{lang.name}</h3>
              <p className="text-sm text-muted-foreground">
                Proficiency: {lang.proficiency}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
