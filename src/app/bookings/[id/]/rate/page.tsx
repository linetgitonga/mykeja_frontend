'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Check, Star } from 'lucide-react';

type Tab = 'agent' | 'property' | 'experience';
type RatingStep = 'form' | 'success';

export default function RatingPage() {
  const [activeTab, setActiveTab] = useState<Tab>('agent');
  const [step, setStep] = useState<RatingStep>('form');

  const [agentRating, setAgentRating] = useState(4);
  const [agentComment, setAgentComment] = useState('');
  const [agentMetrics, setAgentMetrics] = useState({
    professionalism: 4,
    honesty: 4,
    punctuality: 4,
  });

  const [propertyRating, setPropertyRating] = useState(4);
  const [propertyComment, setPropertyComment] = useState('');
  const [propertyMetrics, setPropertyMetrics] = useState({
    accuracy: 4,
    condition: 4,
    amenities: 4,
  });

  const [experienceRating, setExperienceRating] = useState(4);
  const [experienceComment, setExperienceComment] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState(false);

  const handleSubmit = () => {
    setStep('success');
  };

  const renderStarRating = (value: number, onChange: (val: number) => void) => {
    return (
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onChange(star)}
            className="text-4xl transition-all hover:scale-110"
          >
            <Star
              size={32}
              className={star <= value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
            />
          </button>
        ))}
      </div>
    );
  };

  const renderMetricSlider = (
    label: string,
    value: number,
    onChange: (val: number) => void
  ) => {
    return (
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-semibold text-text-primary dark:text-white">
            {label}
          </label>
          <Badge variant="default">{value}/5</Badge>
        </div>
        <input
          type="range"
          min="1"
          max="5"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full"
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-surface-primary dark:bg-slate-950 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {step === 'form' && (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-heading-1 font-bold text-text-primary dark:text-white mb-2">
                Rate Your Experience
              </h1>
              <p className="text-text-secondary dark:text-dark-text-secondary">
                Help other tenants and improve our platform
              </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-border-default dark:border-dark-border-default">
              {[
                { id: 'agent', label: 'Rate the Agent' },
                { id: 'property', label: 'Rate the Property' },
                { id: 'experience', label: 'Overall Experience' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`py-3 px-2 font-semibold border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-brand-primary text-brand-primary'
                      : 'border-transparent text-text-secondary dark:text-dark-text-secondary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <Card variant="glass" padding="lg" className="mb-6">
              {/* Agent Rating */}
              {activeTab === 'agent' && (
                <div>
                  <h2 className="text-heading-2 font-bold mb-6 text-text-primary dark:text-white">
                    How was the agent?
                  </h2>

                  {renderStarRating(agentRating, setAgentRating)}

                  {renderMetricSlider(
                    'Professionalism',
                    agentMetrics.professionalism,
                    (val) => setAgentMetrics({ ...agentMetrics, professionalism: val })
                  )}
                  {renderMetricSlider(
                    'Honesty',
                    agentMetrics.honesty,
                    (val) => setAgentMetrics({ ...agentMetrics, honesty: val })
                  )}
                  {renderMetricSlider(
                    'Punctuality',
                    agentMetrics.punctuality,
                    (val) => setAgentMetrics({ ...agentMetrics, punctuality: val })
                  )}

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-text-primary dark:text-white">
                      Additional Comments (Optional)
                    </label>
                    <textarea
                      value={agentComment}
                      onChange={(e) => setAgentComment(e.target.value)}
                      placeholder="Share more about your experience..."
                      className="w-full px-4 py-2 rounded-md border border-border-default dark:border-dark-border-default dark:bg-surface-white h-24 resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Property Rating */}
              {activeTab === 'property' && (
                <div>
                  <h2 className="text-heading-2 font-bold mb-6 text-text-primary dark:text-white">
                    How was the property?
                  </h2>

                  {renderStarRating(propertyRating, setPropertyRating)}

                  {renderMetricSlider(
                    'Accuracy',
                    propertyMetrics.accuracy,
                    (val) => setPropertyMetrics({ ...propertyMetrics, accuracy: val })
                  )}
                  {renderMetricSlider(
                    'Condition',
                    propertyMetrics.condition,
                    (val) => setPropertyMetrics({ ...propertyMetrics, condition: val })
                  )}
                  {renderMetricSlider(
                    'Amenities',
                    propertyMetrics.amenities,
                    (val) => setPropertyMetrics({ ...propertyMetrics, amenities: val })
                  )}

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-text-primary dark:text-white">
                      Additional Comments (Optional)
                    </label>
                    <textarea
                      value={propertyComment}
                      onChange={(e) => setPropertyComment(e.target.value)}
                      placeholder="Share more about your experience..."
                      className="w-full px-4 py-2 rounded-md border border-border-default dark:border-dark-border-default dark:bg-surface-white h-24 resize-none"
                    />
                  </div>
                </div>
              )}

              {/* Experience Rating */}
              {activeTab === 'experience' && (
                <div>
                  <h2 className="text-heading-2 font-bold mb-6 text-text-primary dark:text-white">
                    Overall Experience
                  </h2>

                  {renderStarRating(experienceRating, setExperienceRating)}

                  <label className="flex items-center gap-2 mb-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={wouldRecommend}
                      onChange={(e) => setWouldRecommend(e.target.checked)}
                    />
                    <span className="text-text-primary dark:text-white">
                      Would you recommend this property/agent to others?
                    </span>
                  </label>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-text-primary dark:text-white">
                      Additional Comments (Optional)
                    </label>
                    <textarea
                      value={experienceComment}
                      onChange={(e) => setExperienceComment(e.target.value)}
                      placeholder="Any additional feedback?..."
                      className="w-full px-4 py-2 rounded-md border border-border-default dark:border-dark-border-default dark:bg-surface-white h-24 resize-none"
                    />
                  </div>
                </div>
              )}
            </Card>

            {/* Moderation Notice */}
            <Card variant="flat" padding="md" className="mb-6 bg-blue-50 dark:bg-blue-900/20 border border-brand-primary">
              <p className="text-sm text-text-primary dark:text-white">
                <span className="font-semibold">ℹ️ Note:</span> Your review will be published after a brief moderation review to ensure quality and compliance with our community guidelines.
              </p>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button className="w-full" onClick={handleSubmit}>
                Submit Ratings
              </Button>
              <Button variant="ghost" className="w-full">
                Skip
              </Button>
            </div>
          </>
        )}

        {step === 'success' && (
          <Card variant="glass" padding="lg" className="text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-state-success/20 rounded-full flex items-center justify-center mx-auto">
                <Check className="text-state-success" size={40} />
              </div>
            </div>

            <h2 className="text-heading-2 font-bold mb-2 text-text-primary dark:text-white">
              Thank you for your feedback!
            </h2>

            <p className="text-text-secondary dark:text-dark-text-secondary mb-6">
              Your ratings are being reviewed and will be published soon
            </p>

            <div className="space-y-3">
              <Button className="w-full">Back to Bookings</Button>
              <Button variant="secondary" className="w-full">
                Browse More Properties
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
