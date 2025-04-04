"use client";
import React, { useMemo } from 'react';
import { useSurvey } from '../contexts/SurveyContext';

export const withSurveyAnalytics = <P extends object>(
  WrappedComponent: React.ComponentType<P & { analytics?: { totalVotes: number; totalSurveys: number; averageVotesPerSurvey: number } }>
) => {
  return function WithSurveyAnalyticsComponent(props: P) {
    const { votes, surveys, getTotalVotes } = useSurvey();

    const analytics = useMemo(() => {
      const totalVotes = getTotalVotes();
      return {
        totalVotes,
        totalSurveys: surveys.length,
        averageVotesPerSurvey: surveys.length ? totalVotes / surveys.length : 0,
      };
    }, [surveys, votes, getTotalVotes]);

    return <WrappedComponent {...props} analytics={analytics} />;
  };
};