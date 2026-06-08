'use client';

import React, { useState } from 'react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Clock, CheckCircle, AlertCircle, User } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'PENDING_VERIFICATION' | 'IN_PROGRESS' | 'VERIFIED';
  appliedDate: string;
  officer?: string;
}

export default function VerificationsPage() {
  const [selectedTab, setSelectedTab] = useState<'pending' | 'inprogress' | 'verified'>('pending');

  const agents: { [key: string]: Agent[] } = {
    pending: [
      {
        id: '1',
        name: 'New Agency Ltd',
        email: 'info@newagency.com',
        phone: '+254712345678',
        status: 'PENDING_VERIFICATION',
        appliedDate: '2026-06-05',
      },
      {
        id: '2',
        name: 'Real Estate Pro',
        email: 'contact@realestatepo.com',
        phone: '+254723456789',
        status: 'PENDING_VERIFICATION',
        appliedDate: '2026-06-04',
      },
    ],
    inprogress: [
      {
        id: '3',
        name: 'Skyline Realty',
        email: 'info@skyline.com',
        phone: '+254734567890',
        status: 'IN_PROGRESS',
        appliedDate: '2026-06-01',
        officer: 'John Doe',
      },
    ],
    verified: [
      {
        id: '4',
        name: 'First Choice Properties',
        email: 'info@firstchoice.com',
        phone: '+254745678901',
        status: 'VERIFIED',
        appliedDate: '2026-05-15',
      },
    ],
  };

  const getStatusIcon = (status: string) => {
    if (status === 'PENDING_VERIFICATION') return <Clock className="text-state-warning" size={20} />;
    if (status === 'IN_PROGRESS') return <AlertCircle className="text-state-warning" size={20} />;
    return <CheckCircle className="text-state-success" size={20} />;
  };

  const tabData = {
    pending: agents.pending,
    inprogress: agents.inprogress,
    verified: agents.verified,
  };

  const displayAgents = tabData[selectedTab];

  return (
    <div className="min-h-screen bg-surface-primary dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-border-default dark:border-dark-border-default sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-heading-2 font-bold text-text-primary dark:text-white">
            Agent Verification
          </h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border-default dark:border-dark-border-default">
          {[
            { id: 'pending', label: `Pending (${agents.pending.length})` },
            { id: 'inprogress', label: `In Progress (${agents.inprogress.length})` },
            { id: 'verified', label: `Verified (${agents.verified.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`py-3 px-2 font-semibold border-b-2 transition-colors ${
                selectedTab === tab.id
                  ? 'border-brand-primary text-brand-primary'
                  : 'border-transparent text-text-secondary dark:text-dark-text-secondary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayAgents.map((agent) => (
            <Card key={agent.id} variant="glass" padding="lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-primary/20 rounded-full flex items-center justify-center">
                    <User className="text-brand-primary" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary dark:text-white">
                      {agent.name}
                    </h3>
                    <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                      {agent.email}
                    </p>
                  </div>
                </div>
                {getStatusIcon(agent.status)}
              </div>

              <div className="space-y-2 mb-4 pb-4 border-b border-border-default dark:border-dark-border-default">
                <p className="text-sm">
                  <span className="text-text-secondary dark:text-dark-text-secondary">Phone:</span>{' '}
                  <span className="text-text-primary dark:text-white font-medium">{agent.phone}</span>
                </p>
                <p className="text-sm">
                  <span className="text-text-secondary dark:text-dark-text-secondary">Applied:</span>{' '}
                  <span className="text-text-primary dark:text-white font-medium">{agent.appliedDate}</span>
                </p>
                {agent.officer && (
                  <p className="text-sm">
                    <span className="text-text-secondary dark:text-dark-text-secondary">Officer:</span>{' '}
                    <span className="text-text-primary dark:text-white font-medium">{agent.officer}</span>
                  </p>
                )}
              </div>

              {selectedTab === 'pending' && (
                <div className="space-y-2">
                  <Button size="sm" className="w-full">
                    Assign Officer
                  </Button>
                  <Button size="sm" variant="secondary" className="w-full">
                    View Application
                  </Button>
                </div>
              )}

              {selectedTab === 'inprogress' && (
                <div className="space-y-2">
                  <Button size="sm" className="w-full">
                    View Evidence
                  </Button>
                  <Button size="sm" variant="secondary" className="w-full">
                    Approve
                  </Button>
                  <Button size="sm" variant="secondary" className="w-full">
                    Reject
                  </Button>
                </div>
              )}

              {selectedTab === 'verified' && (
                <Badge variant="success" className="w-full text-center">
                  ✓ Verified
                </Badge>
              )}
            </Card>
          ))}
        </div>

        {displayAgents.length === 0 && (
          <Card variant="flat" padding="lg" className="text-center">
            <h3 className="text-heading-2 font-semibold mb-2">
              No agents found
            </h3>
            <p className="text-text-secondary dark:text-dark-text-secondary">
              {selectedTab === 'pending' && 'All pending verifications have been processed'}
              {selectedTab === 'inprogress' && 'No verifications in progress'}
              {selectedTab === 'verified' && 'No verified agents yet'}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
