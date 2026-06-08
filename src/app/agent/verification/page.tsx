'use client';

import React from 'react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useAgents } from '@/lib/hooks';

export default function VerificationPage() {
  // Simulate fetching current agent's verification status
  // In a real app, this would use a specific endpoint like /api/v1/agents/me/
  const status = 'VERIFIED'; // PENDING_VERIFICATION, IN_PROGRESS, VERIFIED, SUSPENDED
  
  return (
    <div className="min-h-screen bg-surface-primary dark:bg-slate-950 pb-12">
      <header className="bg-white dark:bg-slate-900 border-b border-border-default dark:border-dark-border-default sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-heading-2 font-bold text-text-primary dark:text-white">
            Verification & Status
          </h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <Card padding="lg" className="border-t-4 border-t-brand-primary">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 rounded-full">
              {status === 'VERIFIED' ? (
                <CheckCircle className="text-state-success" size={32} />
              ) : status === 'IN_PROGRESS' ? (
                <Clock className="text-brand-primary" size={32} />
              ) : (
                <AlertCircle className="text-state-warning" size={32} />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Account Status: {status}</h2>
              <p className="text-text-secondary mb-4">
                {status === 'VERIFIED' 
                  ? 'Your account is fully verified. You have full access to list properties and receive bookings.'
                  : 'Your account verification is currently in progress. A field officer will contact you shortly.'}
              </p>
              {status !== 'VERIFIED' && (
                <Button>Contact Support</Button>
              )}
            </div>
          </div>
        </Card>

        <Card padding="lg">
          <h3 className="text-lg font-bold mb-4">Strike Engine Status</h3>
          <div className="flex items-center justify-between p-4 bg-surface-secondary rounded-lg mb-4">
            <div>
              <p className="font-semibold text-state-success">0 Strikes</p>
              <p className="text-sm text-text-secondary">Your record is clean</p>
            </div>
            <Badge variant="success">Good Standing</Badge>
          </div>
          <p className="text-sm text-text-secondary">
            Our platform uses a progressive discipline strike engine. Accumulating strikes from tenant complaints or policy violations may result in account suspension.
          </p>
        </Card>
      </div>
    </div>
  );
}
