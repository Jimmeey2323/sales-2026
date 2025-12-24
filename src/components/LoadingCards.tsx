import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Skeleton } from './ui/skeleton';

export const LoadingMetricCard: React.FC = () => (
  <div className="glass-surface p-4 sm:p-5">
    <div className="flex items-center justify-between gap-3 mb-3">
      <Skeleton className="h-8 w-8 rounded-lg" />
      <Skeleton className="h-4 w-16" />
    </div>
    <Skeleton className="h-8 w-24 mb-2" />
    <Skeleton className="h-4 w-20 mb-4" />
    <Skeleton className="h-1.5 w-full rounded-full" />
  </div>
);

export const LoadingOfferCard: React.FC = () => (
  <Card className="overflow-hidden">
    <CardHeader className="p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
      </div>
    </CardHeader>
  </Card>
);

export const LoadingQuickStats: React.FC = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
    {[...Array(6)].map((_, i) => (
      <LoadingMetricCard key={i} />
    ))}
  </div>
);

export const LoadingMonthSection: React.FC = () => (
  <Card className="mb-6">
    <CardContent className="p-6 sm:p-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-12 rounded-xl" />
          <div>
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <div className="flex gap-4">
          <Skeleton className="h-20 w-32 rounded-xl" />
          <Skeleton className="h-20 w-32 rounded-xl" />
        </div>
      </div>
      <div className="space-y-4">
        <LoadingOfferCard />
        <LoadingOfferCard />
        <LoadingOfferCard />
      </div>
    </CardContent>
  </Card>
);
