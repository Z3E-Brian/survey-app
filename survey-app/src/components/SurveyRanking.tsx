"use client";
import React, { useMemo } from 'react';
import { useSurvey } from '../contexts/SurveyContext';
import { withSurveyAnalytics } from './withSurveyAnalytics';

interface SurveyRankingProps {
  analytics?: {
    totalVotes: number;
    totalSurveys: number;
    averageVotesPerSurvey: number;
  };
}

const SurveyRanking: React.FC<SurveyRankingProps> = ({ analytics }) => {
  const { votes, surveys, hasVoted, isLoading } = useSurvey();

  const sortedSurveys = useMemo(() => {
    return surveys
      .sort((a, b) => (votes[b.id] || 0) - (votes[a.id] || 0))
      .map(survey => ({
        ...survey,
        voteCount: votes[survey.id] || 0,
        userVoted: hasVoted(survey.id)
      }));
  }, [surveys, votes, hasVoted]);

  if (isLoading) {
    return <p>Loading ranking...</p>;
  }

  return (
    <div>
      <h2>Survey Ranking</h2>
      {analytics && (
        <div>
          <p>Total Votes: {analytics.totalVotes}</p>
          <p>Surveys: {analytics.totalSurveys}</p>
          <p>Average Votes: {analytics.averageVotesPerSurvey.toFixed(1)}</p>
        </div>
      )}
      <ul>
        {sortedSurveys.map(({ id, title, voteCount, userVoted }) => (
          <li key={id}>
            <span>{title}</span>
            <span>{voteCount} votes</span>
            {userVoted && <span>Voted</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withSurveyAnalytics(SurveyRanking);