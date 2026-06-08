'use client';

import React from 'react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Star } from 'lucide-react';
import { useRatings } from '@/lib/hooks';
import type { Rating } from '@/lib/types';

export default function RatingsPage() {
  const { data: ratings, isLoading } = useRatings();

  return (
    <div className="min-h-screen bg-surface-primary dark:bg-slate-950 pb-12">
      <header className="bg-white dark:bg-slate-900 border-b border-border-default dark:border-dark-border-default sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-heading-2 font-bold text-text-primary dark:text-white">
            My Ratings
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Summary Card */}
        <Card padding="lg" className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <div>
            <p className="text-sm text-text-secondary uppercase tracking-wider mb-1">Average Rating</p>
            <div className="flex items-center gap-2">
              <span className="text-5xl font-bold">4.8</span>
              <div className="flex flex-col items-start text-brand-primary">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <span className="text-sm text-text-secondary mt-1">Based on {ratings?.length || 0} reviews</span>
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-2 w-full">
            {/* Mock rating bars */}
            {[5, 4, 3, 2, 1].map(num => (
              <div key={num} className="flex items-center gap-2 text-sm">
                <span className="w-4">{num}</span>
                <Star size={12} className="text-text-secondary" />
                <div className="flex-1 h-2 bg-surface-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-brand-primary" style={{ width: num === 5 ? '80%' : num === 4 ? '15%' : '5%' }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {isLoading ? (
          <div className="text-center py-12">Loading ratings...</div>
        ) : ratings?.length === 0 ? (
          <Card padding="lg" className="text-center py-12">
            <p className="text-text-secondary">No ratings received yet.</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {ratings?.map((rating: Rating) => (
              <Card key={rating.id} padding="lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex text-brand-primary">
                        {[1, 2, 3, 4, 5].map(i => (
                          <Star key={i} size={14} fill={i <= rating.score ? 'currentColor' : 'none'} className={i <= rating.score ? '' : 'text-slate-300'} />
                        ))}
                      </div>
                      <span className="font-bold">{rating.score}.0</span>
                    </div>
                    <p className="font-medium">{rating.authorName}</p>
                    <p className="text-xs text-text-secondary">{new Date(rating.createdAt).toLocaleDateString()}</p>
                  </div>
                  <Badge variant={rating.status === 'APPROVED' ? 'success' : 'warning'}>{rating.status}</Badge>
                </div>
                <p className="text-text-primary bg-surface-secondary p-4 rounded-lg italic">
                  "{rating.comment}"
                </p>
                {rating.propertyTitle && (
                  <p className="text-sm text-text-secondary mt-3">
                    Property: {rating.propertyTitle}
                  </p>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
