import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { PlusIcon, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const initialCertifications = [
  { name: 'AWS Certified Solutions Architect', link: '' },
  { name: 'Google Cloud Professional Developer', link: '' },
  { name: 'MongoDB Certified Developer', link: '' },
];

export const CertificationsCard = () => {
  const [certificationsList, setCertificationsList] = useState(initialCertifications);
  const [newCertification, setNewCertification] = useState({ name: '', link: '' });
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [certificationsToRemove, setCertificationsToRemove] = useState(new Set());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCertification(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCertification = (e) => {
    e.preventDefault();
    if (!newCertification.name || !newCertification.link) {
      toast.error('Please fill in both fields.');
      return;
    }

    // Check if the certification already exists
    if (certificationsList.some(cert => cert.name === newCertification.name)) {
      toast.error('This certification has already been added.');
      return;
    }

    setCertificationsList(prev => [...prev, { ...newCertification }]); // Spread newCertification object
    setNewCertification({ name: '', link: '' });
    setIsAddOpen(false);
  };

  const handleCheckboxChange = (name) => {
    setCertificationsToRemove(prev => {
      const updated = new Set(prev);
      if (updated.has(name)) {
        updated.delete(name); // Remove if already selected
      } else {
        updated.add(name); // Add if not selected
      }
      return updated;
    });
  };

  const handleRemoveCertification = () => {
    setCertificationsList(prev => prev.filter(cert => !certificationsToRemove.has(cert.name)));
    setCertificationsToRemove(new Set()); // Clear selected certifications
    setIsRemoveOpen(false);
  };

  return (
    <Card className="rounded-md shadow-md mb-6">
      <CardHeader className="flex flex-row items-center gap-4 justify-between">
        <CardTitle>Certifications</CardTitle>
        <div className="flex justify-start h-full gap-2">
          {/* Add Certification Dialog */}
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <PlusIcon className="cursor-pointer rounded-full border border-black-950" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Certification</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddCertification} className="space-y-4">
                <Label htmlFor="name">Certification Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={newCertification.name}
                  onChange={handleInputChange}
                  required
                />

                <Label htmlFor="link">Certification Link</Label>
                <Input
                  id="link"
                  name="link"
                  type="url"
                  value={newCertification.link}
                  onChange={handleInputChange}
                  required
                />

                <Button type="submit" className="w-full">Add Certification</Button>
              </form>
            </DialogContent>
          </Dialog>

          {/* Remove Certification Dialog */}
          <Dialog open={isRemoveOpen} onOpenChange={setIsRemoveOpen}>
            <DialogTrigger asChild>
              <Minus className="cursor-pointer rounded-full border border-black-950" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Remove Certification</DialogTitle>
                <DialogDescription>
                  Select the certifications you want to remove.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {certificationsList.map((cert, index) => (
                  <div key={index} className="flex gap-2">
                    <Checkbox
                      id={`certification-${index}`}                    
                      onChange={() => handleCheckboxChange(cert.name)} // Call handler on change
                    />
                    <Label htmlFor={`certification-${index}`}>{cert.name}</Label>
                  </div>
                ))}
              </div>
              <DialogFooter>
                <Button type="button" onClick={() => setIsRemoveOpen(false)}>Cancel</Button>
                <Button type="button" onClick={handleRemoveCertification} variant="destructive">Remove</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      {/* Display Certifications List */}
      <CardContent>
        <ul className="space-y-2">
          {certificationsList.map((cert, index) => (
            <li key={index}>
              <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {cert.name}
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};