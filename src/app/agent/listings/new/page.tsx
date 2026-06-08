'use client';

import React, { useState } from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';

export default function NewListingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call to create property
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/agent/listings');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-surface-primary dark:bg-slate-950 pb-20">
      <header className="bg-white dark:bg-slate-900 border-b border-border-default dark:border-dark-border-default sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-heading-3 font-bold text-text-primary dark:text-white">
            Create New Listing
          </h1>
          <div className="text-sm font-medium text-text-secondary">
            Step {step} of 3
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
          {step === 1 && (
            <Card padding="lg" className="space-y-6">
              <h2 className="text-heading-3 font-bold">Basic Information</h2>
              
              <div className="space-y-2">
                <Label htmlFor="title">Property Title *</Label>
                <Input id="title" placeholder="e.g. Modern 2-Bedroom Apartment in Kilimani" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Property Type *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="APARTMENT">Apartment</SelectItem>
                      <SelectItem value="STUDIO">Studio</SelectItem>
                      <SelectItem value="BEDSITTER">Bedsitter</SelectItem>
                      <SelectItem value="TOWNHOUSE">Townhouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Monthly Rent (KES) *</Label>
                  <Input id="price" type="number" placeholder="e.g. 45000" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms *</Label>
                  <Input id="bedrooms" type="number" min="0" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms *</Label>
                  <Input id="bathrooms" type="number" min="0" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">General Location *</Label>
                <Input id="location" placeholder="e.g. Kilimani, Nairobi" required />
              </div>
            </Card>
          )}

          {step === 2 && (
            <Card padding="lg" className="space-y-6">
              <h2 className="text-heading-3 font-bold">Details & Amenities</h2>
              
              <div className="space-y-2">
                <Label>Furnishing Status *</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select furnishing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FURNISHED">Fully Furnished</SelectItem>
                    <SelectItem value="SEMI_FURNISHED">Semi-Furnished</SelectItem>
                    <SelectItem value="UNFURNISHED">Unfurnished</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <textarea 
                  id="description" 
                  className="w-full min-h-[120px] rounded-lg border border-border-default p-3 focus:ring-2 focus:ring-brand-primary" 
                  placeholder="Describe the property, features, and neighborhood..."
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label>Amenities (Comma separated)</Label>
                <Input id="amenities" placeholder="e.g. Wi-Fi, Gym, Parking, Borehole" />
              </div>
            </Card>
          )}

          {step === 3 && (
            <Card padding="lg" className="space-y-6">
              <h2 className="text-heading-3 font-bold">Photos</h2>
              <p className="text-sm text-text-secondary">
                Upload at least one internal photo. External photos will be locked behind a paywall.
              </p>
              
              <div className="border-2 border-dashed border-border-default rounded-xl p-12 text-center">
                <div className="text-text-secondary mb-4">Drag and drop images here or</div>
                <Button type="button" variant="secondary">Browse Files</Button>
              </div>
            </Card>
          )}

          <div className="flex justify-between mt-8">
            <Button type="button" variant="secondary" onClick={step === 1 ? () => router.push('/agent/listings') : handleBack}>
              {step === 1 ? 'Cancel' : 'Back'}
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              {step === 3 ? 'Publish Listing' : 'Next Step'}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
