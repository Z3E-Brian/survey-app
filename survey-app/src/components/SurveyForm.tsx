"use client";
import React, { useState } from 'react';
import { useSurvey } from '../contexts/SurveyContext';

const SurveyForm: React.FC = () => {
  const { surveys, addVote, addSurvey, hasVoted, isLoading } = useSurvey();
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleSubmitNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTitle.trim()) {
      addSurvey(newTitle, newDescription);
      setNewTitle('');
      setNewDescription('');
    }
  };

  return (
    <div className="p-4 space-y-6 card">
      <h2 className="text-xl font-semibold mb-4">Create New Survey</h2>
      <form onSubmit={handleSubmitNew} className="space-y-4">
        <div>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="New survey title"
            className="w-full p-2 border rounded"
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Description (optional)"
            className="w-full p-2 border rounded mt-2"
            rows={3}
          />
          <button type="submit" className="mt-3 px-4 py-2 bg-primary text-white rounded">
            Create Survey
          </button>
        </div>
      </form>
    </div>
  );
};
export default SurveyForm;