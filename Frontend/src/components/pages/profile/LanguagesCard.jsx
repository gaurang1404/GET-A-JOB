import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { PlusIcon, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

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

const initialLanguages = [
  { name: 'English', proficiency: FluencyLevels.NATIVE },
  { name: 'Spanish', proficiency: FluencyLevels.FLUENT },
  { name: 'French', proficiency: FluencyLevels.INTERMEDIATE },
];

export const LanguagesCard = () => {
  const [languagesList, setLanguagesList] = useState(initialLanguages);
  const [newLanguage, setNewLanguage] = useState({ name: '', proficiency: '' });
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [languagesToRemove, setLanguagesToRemove] = useState(new Set());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLanguage(prev => ({ ...prev, [name]: value }));
  };

  const handleAddLanguage = (e) => {
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

    setLanguagesList(prev => [...prev, { ...newLanguage }]); // Spread newLanguage object
    setNewLanguage({ name: '', proficiency: '' });
    setIsAddOpen(false);
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

  const handleRemoveLanguage = () => {
    setLanguagesList(prev => prev.filter(lang => !languagesToRemove.has(lang.name)));
    setLanguagesToRemove(new Set()); // Clear selected languages
    setIsRemoveOpen(false);
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
                      onChange={() => handleCheckboxChange(lang.name)} // Call handler on change
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
