'use client';

import React from 'react';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { useRatings } from '@/lib/hooks';
import type { Rating } from '@/lib/types';
import { Star, Flag, Check, Trash2 } from 'lucide-react';

export default function AdminRatingsPage() {
  const { data: ratings, isLoading } = useRatings();

  // Filter only flagged or pending reviews for moderation
  const flaggedRatings = ratings?.filter(r => r.status === 'PENDING_REVIEW' || r.isFlagged) || [];

  return (
    <div className="min-h-screen bg-surface-primary dark:bg-slate-950 pb-12">
      <header className="bg-white dark:bg-slate-900 border-b border-border-default dark:border-dark-border-default sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-heading-2 font-bold text-text-primary dark:text-white flex items-center gap-2">
            <Flag className="text-state-warning" />
            Ratings Moderation
          </h1>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-heading-3 font-bold mb-6">Flagged Reviews ({flaggedRatings.length})</h2>
        
        {isLoading ? (
          <div className="text-center py-12">Loading...</div>
        ) : flaggedRatings.length === 0 ? (
          <Card padding="lg" className="text-center py-12 text-text-secondary">
            No flagged ratings require moderation at this time.
          </Card>
        ) : (
          <div className="space-y-4">
            {flaggedRatings.map((rating: Rating) => (
              <Card key={rating.id} padding="lg" className="border-l-4 border-l-state-warning">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex text-brand-primary">
                        {[1, 2, 3, 4, 5].map(i => (
                          <Star key={i} size={14} fill={i <= rating.score ? 'currentColor' : 'none'} className={i <= rating.score ? '' : 'text-slate-300'} />
                        ))}
                      </div>
                      <span className="font-bold">{rating.score}.0</span>
                      <Badge variant="warning">{rating.status}</Badge>
                    </div>
                    <p className="text-sm">From: <strong>{rating.authorName}</strong> To: <strong>{rating.targetName}</strong></p>
                    <p className="text-xs text-text-secondary">{new Date(rating.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="bg-surface-secondary p-4 rounded-lg mb-4">
                  <p className="italic text-text-primary">"{rating.comment}"</p>
                </div>
                
                <div className="flex gap-2 justify-end">
                  <Button size="sm" variant="secondary" icon={<Check size={14} />} className="text-state-success">Approve</Button>
                  <Button size="sm" variant="secondary" icon={<Trash2 size={14} />} className="text-state-error">Remove & Strike</Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
