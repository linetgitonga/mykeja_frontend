'use client';

import React from 'react';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Settings, Save } from 'lucide-react';
import { Input } from '@/components/Input';
import { Label } from '@/components/ui/label';

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-surface-primary dark:bg-slate-950 pb-12">
      <header className="bg-white dark:bg-slate-900 border-b border-border-default dark:border-dark-border-default sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-heading-2 font-bold text-text-primary dark:text-white flex items-center gap-2">
            <Settings className="text-text-secondary" />
            Platform Settings
          </h1>
          <Button icon={<Save size={16} />}>Save Changes</Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <Card padding="lg" className="space-y-6">
          <h2 className="text-heading-3 font-bold border-b border-border-default pb-4">Financial Configuration</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Default Booking Fee (KES)</Label>
              <Input type="number" defaultValue={500} />
            </div>
            <div className="space-y-2">
              <Label>Agent Commission Rate (%)</Label>
              <Input type="number" defaultValue={85} />
            </div>
            <div className="space-y-2">
              <Label>Platform Fee Rate (%)</Label>
              <Input type="number" defaultValue={15} />
            </div>
            <div className="space-y-2">
              <Label>M-Pesa Paybill Number</Label>
              <Input defaultValue="123456" />
            </div>
          </div>
        </Card>

        <Card padding="lg" className="space-y-6">
          <h2 className="text-heading-3 font-bold border-b border-border-default pb-4">Moderation & Rules</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Lock Duration (Days)</Label>
              <Input type="number" defaultValue={3} />
            </div>
            <div className="space-y-2">
              <Label>Strikes for Auto-Suspension</Label>
              <Input type="number" defaultValue={3} />
            </div>
            <div className="space-y-2">
              <Label>Minimum Ratings to show Average</Label>
              <Input type="number" defaultValue={5} />
            </div>
          </div>
        </Card>

        <Card padding="lg" className="space-y-6 border-state-error">
          <h2 className="text-heading-3 font-bold text-state-error border-b border-border-default pb-4">Danger Zone</h2>
          <p className="text-text-secondary mb-4">Operations here can disrupt platform availability.</p>
          <Button variant="secondary" className="border-state-error text-state-error">Enable Maintenance Mode</Button>
        </Card>
      </div>
    </div>
  );
}
